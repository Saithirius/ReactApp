import { API } from "../api/api";
import defLargePhoto from '../assets/img/defPhotoLarge.jpg';
import defSmallPhoto from '../assets/img/defPhotoSmall.jpg';

const ADD_POST = 'profileReducer/ADD-POST';
const SET_PROFILE = 'profileReducer/SET-PROFILE';
const SET_STATUS = 'profileReducer/SET-STATUS';
const CLEAR_PROFILE = 'profileReducer/CLEAR-PROFILE'

let initState = {
  profileData: {
    userID: null,
    name: '',
    status: '',
    aboutMe: '',
    lookingForAJob: null,
    photos: {
      large: null,
      small: null
    }
  },
  postsData: [
    { id: 0, text: 'Первый пост на странице!', date: '14.05.2020' },
    { id: 1, text: 'Реклама!', date: '14.05.2020' },
    { id: 2, text: 'Один из недавних постов', date: '16.05.2020' },
    { id: 3, text: 'Текст крайнего поста\nВторая строка поста\nТретья\nИ четвертая)', date: '21.05.2020' },
  ]
}

const profileReducer = (state = initState, action) => {

  switch (action.type) {

    case SET_PROFILE:
      if (!action.profile.photos.large) {
        action.profile.photos.large = defLargePhoto;
        action.profile.photos.small = defSmallPhoto;
      }
      return {
        ...state,
        profileData: {
          userID: action.profile.userId,
          name: action.profile.fullName,
          status: state.profileData.status,
          aboutMe: action.profile.aboutMe,
          lookingForAJob: action.profile.lookingForAJob,
          photos: { ...action.profile.photos }
        }
      }

    case SET_STATUS:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          status: action.status
        }
      }

    case CLEAR_PROFILE:
      return {
        ...state,
        profileData: {...initState.profileData},
      }

    case ADD_POST:
      const id = state.postsData.length;
      return {
        ...state,
        postsData: [...state.postsData, { id: id, text: action.text }],
      }

    default:
      return state;

  }
};

export const addNewPost = (text) => ({ type: ADD_POST, text: text });
export const clearProfile = () => ({ type: CLEAR_PROFILE });
export const getProfile = (userID) => async (dispatch) => {
  const data = await API.getProfile(userID);
  dispatch({ type: SET_PROFILE, profile: { ...data } });
};
export const getStatus = (userID) => async (dispatch) => {
  const data = await API.getStatus(userID);
  dispatch({ type: SET_STATUS, status: data });
};
export const changeStatus = (text) => async (dispatch) => {
  await API.changeStatus(text)
  dispatch({ type: SET_STATUS, status: text });
};

export default profileReducer;