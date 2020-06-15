import { API } from "../api/api";
import defPhoto from '../assets/img/defPhotoSmall.jpg';

const SET_USERS = 'friendsReducer/SET-USERS';
const SET_FRIENDS = 'friendsReducer/SET-FRIENDS';
const CLEAR_USERS = 'friendsReducer/CLEAR-USERS';
const SET_IS_FETCHING = 'friendsReducer/SET-IS-FETCHING';
const FOLLOW_TOGGLE = 'friendsReducer/FOLLOW-TOGGLE'; // Подписаться/Отписаться 
const FOLLOWED_TOGGLE = 'friendsReducer/FOLLOWED-TOGGLE'; // Сейчас осуществляется подписка/отписка

let initialState = {

  friends: [],
  totalFriends: 0,
  currentFriendsPage: 0,

  users: [],
  totalUsers: 0,
  currentUsersPage: 0,

  isFetching: false
}

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Добавить новых пользователей
    case SET_USERS:
      return {
        ...state,
        totalUsers: action.totalUsers,
        currentUsersPage: action.currentPage,
        users: [...state.users, ...action.users.map(u => {
          if (!u.photos.small) u.photos.small = defPhoto;
          return { ...u, followToggle: false }
        })]
      };
    // Добавить друзей
    case SET_FRIENDS:
      return {
        ...state,
        totalFriends: action.totalUsers,
        currentFriendsPage: action.currentPage,
        friends: [...state.friends, ...action.users.map(u => {
          if (!u.photos.small) u.photos.small = defPhoto;
          return { ...u, followToggle: false }
        })]
      };
    //Подписаться/Отписаться
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
        users: [],
        currentUsersPage: 0,
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

const followSuccess = (userID, isFollow) => ({ type: FOLLOW_TOGGLE, userID, follow: isFollow });
const setUsers = (users, totalUsers, currentPage) => ({ type: SET_USERS, users, totalUsers, currentPage });
const setFriends = (users, totalUsers, currentPage) => ({ type: SET_FRIENDS, users, totalUsers, currentPage });
const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
const setIsFollowed = (userID, isFollowed) => ({ type: FOLLOWED_TOGGLE, userID, isFollowed });
export const clearAllUsers = () => ({ type: CLEAR_USERS });

export const getUsers = (isFriend=false, pageSize=3) => async (dispatch, getState) => {
  dispatch(setIsFetching(true));

  const currentPage = isFriend ? 
    getState().friendPage.currentFriendsPage + 1 : 
    getState().friendPage.currentUsersPage + 1;
  const data = await API.getUsers(pageSize, currentPage, isFriend);
  isFriend ?
  dispatch(setFriends(data.items, data.totalCount, currentPage)) :
  dispatch(setUsers(data.items, data.totalCount, currentPage));

  dispatch(setIsFetching(false));
};
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