import { API } from "../api/api";
import defPhoto from '../assets/img/defPhotoSmall.jpg';

const SET_USERS = 'friendsReducer/SET-USERS';
const SET_FRIENDS = 'friendsReducer/SET-FRIENDS';
const CLEAR_USERS = 'friendsReducer/CLEAR-USERS';
const ENDED_USERS = 'friendsReducer/ENDED-USERS';
const SET_TERM = 'friendsReducer/SET-TERM';
const IS_FRIENDS_TOGGLE = 'friendsReducer/IS-FRIENDS-TOGGLE';
const SET_IS_FETCHING = 'friendsReducer/SET-IS-FETCHING';
const FOLLOW_TOGGLE = 'friendsReducer/FOLLOW-TOGGLE'; // Подписаться/Отписаться 
const FOLLOWED_TOGGLE = 'friendsReducer/FOLLOWED-TOGGLE'; // Сейчас осуществляется подписка/отписка
const PAGE_SIZE = 3;

type UserType = {
  "name": string
  "id": number
  "photos": {
    "small": string | null
    "large": string | null
  },
  "status": string | null
  "followed": boolean
}
let initialState = {
  friends: [] as UserType[],
  users: [] as UserType[],
  totalUsers: 0,
  currentPage: 0,
  isFriends: true,
  term: '',
  isFetching: false,
  endedUsers: false,
}
type InitialStateType = typeof initialState
const friendsReducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    //Добавить новых пользователей
    case SET_USERS:
      return {
        ...state,
        totalUsers: action.totalUsers,
        currentPage: action.currentPage,
        users: [...state.users, ...action.users.map((u: UserType) => {
          if (!u.photos.small) u.photos.small = defPhoto;
          return { ...u, followToggle: false }
        })]
      };
    // Добавить друзей
    case SET_FRIENDS:
      return {
        ...state,
        totalUsers: action.totalUsers,
        currentPage: action.currentPage,
        friends: [...state.friends, ...action.users.map((u: UserType) => {
          if (!u.photos.small) u.photos.small = defPhoto;
          return { ...u, followToggle: false }
        })]
      };
    // Пользователи закончились
    case ENDED_USERS:
      return {
        ...state,
        endedUsers: true
      };
    //Подписка прошла успешна
    case FOLLOW_TOGGLE:
      return {
        ...state,
        friends: state.friends.map(u => (u.id === action.userID) ? { ...u, followed: action.follow } : u),
        users: state.users.map(u => (u.id === action.userID) ? { ...u, followed: action.follow } : u),
      };
    //Чистим список пользователей
    case CLEAR_USERS:
      return {
        ...state,
        ...initialState
      }
    //Теперь ищем не друзей, а пользователей
    case IS_FRIENDS_TOGGLE:
      return {
        ...state,
        isFriends: false,
        currentPage: 1
      }
    //Поиск по имени
    case SET_TERM:
      return {
        ...state,
        term: action.term,
      }
    //Вкл\Выкл анимации загрузки
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    //Вкл\Выкл режима подписки\отписки 
    case FOLLOWED_TOGGLE:
      return {
        ...state,
        friends: state.friends.map(u => (u.id === action.userID) ? { ...u, followToggle: action.isFollowed } : u),
        users: state.users.map(u => ((u.id === action.userID) ? { ...u, followToggle: action.isFollowed } : u))
      }
    default:
      return state;

  }
};

type FollowSuccessActionType = {type: typeof FOLLOW_TOGGLE, userID: number, follow: boolean}
const followSuccess = (userID: number, isFollow: boolean): FollowSuccessActionType => ({ type: FOLLOW_TOGGLE, userID, follow: isFollow }); // Подписка\Отписка успешна
type SetUsersActionType = {type: typeof SET_USERS, users: UserType[], totalUsers: number, currentPage: number}
const setUsers = (users: UserType[], totalUsers: number, currentPage: number): SetUsersActionType => ({ type: SET_USERS, users, totalUsers, currentPage });
type SetFriendsActionType = {type: typeof SET_FRIENDS, users: UserType[], totalUsers: number, currentPage: number}
const setFriends = (users: UserType[], totalUsers: number, currentPage: number): SetFriendsActionType => ({ type: SET_FRIENDS, users, totalUsers, currentPage });
type SetTermActionType = { type: typeof SET_TERM, term: string}
export const setTerm = (term: string):SetTermActionType => ({ type: SET_TERM, term });
type SetIsFetchingActionType = { type: typeof SET_IS_FETCHING, isFetching: boolean}
const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: SET_IS_FETCHING, isFetching });
type SetIsFollowedActionType = {type: typeof FOLLOWED_TOGGLE, userID: number, isFollowed: boolean}
const setIsFollowed = (userID: number, isFollowed: boolean): SetIsFollowedActionType => ({ type: FOLLOWED_TOGGLE, userID, isFollowed }); // Вкл\Выкл режима подписки
type ClearAllUsersActionType = {type: typeof CLEAR_USERS}
export const clearAllUsers = (): ClearAllUsersActionType => ({ type: CLEAR_USERS });
type IsFriendsToggleActionType = { type: typeof IS_FRIENDS_TOGGLE}
const isFriendsToggle = (): IsFriendsToggleActionType => ({ type: IS_FRIENDS_TOGGLE }); // Меняем isFriends, и сбрасываем текущую стр.

export const getUsers = () => async (dispatch: any, getState: any) => {
  dispatch(setIsFetching(true));

  const term = getState().friendPage.term;
  const isFriends = getState().friendPage.isFriends;
  const currentPage = getState().friendPage.currentPage + 1;

  let data = await API.getUsers( PAGE_SIZE, currentPage, isFriends, term);

  if(isFriends && !Boolean(data.items.length)){
    dispatch(isFriendsToggle());
    data = await API.getUsers( PAGE_SIZE, 1, false, term);
    dispatch(setUsers(data.items, data.totalCount, currentPage));
    dispatch(setIsFetching(false));
    // getUsers() Почему не работает рекурсия?
    return 
  }

  if (!data.items.length) dispatch({ type: ENDED_USERS });

  isFriends ?
  dispatch(setFriends(data.items, data.totalCount, currentPage)) :
  dispatch(setUsers(data.items, data.totalCount, currentPage));

  dispatch(setIsFetching(false));
};

// Подписаться\Отписаться
export const toggleFollow = (userID: number, isFollow: boolean) => async (dispatch: any) => {
  dispatch(setIsFollowed(userID, true));

  let response = null;
  isFollow ? 
  response = await API.unfollow(userID) :
  response = await API.follow(userID);

  (response.resultCode === 0) && dispatch(followSuccess(userID, !isFollow));

  dispatch(setIsFollowed(userID, false));
};

export default friendsReducer;