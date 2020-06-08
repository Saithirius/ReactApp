import { API } from "../api/api";
import defPhoto from '../assets/img/defPhotoSmall.jpg';

const FOLLOW_TOGGLE = 'friendsReducer/FOLLOW-FRIEND-TOGGLE';
const SET_USERS = 'friendsReducer/SET-USERS';
const SET_CURRENT_PAGE = 'friendsReducer/SET-CURRENT-PAGE';
const CLEAR_USERS = 'friendsReducer/CLEAR-USERS';
const SET_IS_FETCHING = 'friendsReducer/SET-IS-FETCHING';
const FOLLOWED_TOGGLE = 'friendsReducer/FOLLOWED-TOGGLE';

let initialState = {
  users: [],
  totalUsers: 0,
  currentPage: 0,
  isFetching: false
}

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Подписаться/Отписаться
    case FOLLOW_TOGGLE:
      return {
        ...state,
        users: state.users.map(u => (u.id === action.userID) ? { ...u, followed: action.follow } : u),
      };

    //Добавить новых пользователей
    case SET_USERS:
      return {
        ...state,
        totalUsers: action.totalUsers,
        users: [...state.users, ...action.users.map(u => {
          if (!u.photos.small) u.photos.small = defPhoto;
          return { ...u, followToggle: false }
        })]
      };

    //Поменять текущую стр. пользователей
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }

    //Чистим список пользователей
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        currentPage: 0,
      }
    //Вкл\Выкл анимации загрузки
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case FOLLOWED_TOGGLE:
      return {
        ...state,
        users: [...state.users.map(u => ((u.id === action.userID) ? { ...u, followToggle: action.isFollowed } : u))]
      }

    default:
      return state;

  }
};

const followSuccess = (userID) => ({ type: FOLLOW_TOGGLE, userID, follow: true });
const unfollowSuccess = (userID) => ({ type: FOLLOW_TOGGLE, userID, follow: false });
const setUsers = (users, totalUsers) => ({ type: SET_USERS, users, totalUsers });
const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
const setIsFollowed = (userID, isFollowed) => ({ type: FOLLOWED_TOGGLE, userID, isFollowed });
export const clearAllUsers = () => ({ type: CLEAR_USERS });

export const getUsers = (currentPage, pageSize = 3) => async (dispatch) => {
  dispatch(setIsFetching(true));
  currentPage += 1;
  dispatch(setCurrentPage(currentPage));
  const data = await API.getUsers(pageSize, currentPage);
  dispatch(setUsers(data.items, data.totalCount));
  dispatch(setIsFetching(false));
};
export const follow = (userID) => async (dispatch) => {
  dispatch(setIsFollowed(userID, true));
  const data = await API.follow(userID);
  (data.resultCode === 0) && dispatch(followSuccess(userID));
  dispatch(setIsFollowed(userID, false));
};
export const unfollow = (userID) => async (dispatch) => {
  dispatch(setIsFollowed(userID, true));
  const data = await API.unfollow(userID);
  (data.resultCode === 0) && dispatch(unfollowSuccess(userID));
  dispatch(setIsFollowed(userID, false));
};

export default friendsReducer;