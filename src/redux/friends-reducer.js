import { API } from "../api/api";
import defPhoto from '../assets/img/defPhotoSmall.jpg';

const SET_USERS = 'friendsReducer/SET-USERS';
const SET_FRIENDS = 'friendsReducer/SET-FRIENDS';
const CLEAR_USERS = 'friendsReducer/CLEAR-USERS';
const ENDED_USERS = 'friendsReducer/ENDED-USERS';
const SET_TERM = 'friendsReducer/SET-TERM';
const ISFRIENDS_TOGGLE = 'friendsReducer/ISFRIENDS-TOGGLE';
const SET_IS_FETCHING = 'friendsReducer/SET-IS-FETCHING';
const FOLLOW_TOGGLE = 'friendsReducer/FOLLOW-TOGGLE'; // Подписаться/Отписаться 
const FOLLOWED_TOGGLE = 'friendsReducer/FOLLOWED-TOGGLE'; // Сейчас осуществляется подписка/отписка
const PAGE_SIZE = 3;

let initialState = {

  friends: [],
  users: [],
  totalUsers: 0,
  currentPage: 0,
  isFriends: true,
  term: '',
  isFetching: false,
  endedUsers: false,
}

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Добавить новых пользователей
    case SET_USERS:
      return {
        ...state,
        totalUsers: action.totalUsers,
        currentPage: action.currentPage,
        users: [...state.users, ...action.users.map(u => {
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
        friends: [...state.friends, ...action.users.map(u => {
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
    case ISFRIENDS_TOGGLE:
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

const followSuccess = (userID, isFollow) => ({ type: FOLLOW_TOGGLE, userID, follow: isFollow }); // Подписка\Отписка успешна
const setUsers = (users, totalUsers, currentPage) => ({ type: SET_USERS, users, totalUsers, currentPage });
const setFriends = (users, totalUsers, currentPage) => ({ type: SET_FRIENDS, users, totalUsers, currentPage });
export const setTerm = (term) => ({ type: SET_TERM, term });
const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
const setIsFollowed = (userID, isFollowed) => ({ type: FOLLOWED_TOGGLE, userID, isFollowed }); // Вкл\Выкл режима подписки
export const clearAllUsers = () => ({ type: CLEAR_USERS });
const isFriendsToggle = () => ({ type: ISFRIENDS_TOGGLE }); // Меняем isFriends, и сбрасываем текущую стр.

export const getUsers = () => async (dispatch, getState) => {
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
export const toggleFollow = (userID, isFollow) => async (dispatch) => {
  dispatch(setIsFollowed(userID, true));

  let response = null;
  isFollow ? 
  response = await API.unfollow(userID) :
  response = await API.follow(userID);

  (response.resultCode === 0) && dispatch(followSuccess(userID, !isFollow));

  dispatch(setIsFollowed(userID, false));
};

export default friendsReducer;