import { API } from "../api/api";
import defLargePhoto from '../assets/img/defPhotoLarge.jpg';
import defSmallPhoto from '../assets/img/defPhotoSmall.jpg';
import {ContactsType, PhotosType, PostType, ProfileType} from "../utils/types";
import {dateFormat} from "../utils/date-format";

const SET_PROFILE = 'profileReducer/SET-PROFILE';
const CLEAR_PROFILE = 'profileReducer/CLEAR-PROFILE';
const SET_PROFILE_PHOTO = 'profileReducer/SET-PROFILE-PHOTO';
const SET_STATUS = 'profileReducer/SET-STATUS';
const ADD_POST = 'profileReducer/ADD-POST';

let initState = {
  profileData: {
    userID: null,
    name: '',
    status: '',
    aboutMe: '',
    lookingForAJob: null,
    lookingForAJobDescription: '',
    photos: {
      large: null,
      small: null
    },
    contacts: {
      facebook: null, 
      website: null, 
      vk: null, 
      twitter: null, 
      instagram: null, 
      youtube: null, 
      github: null,
    },
  } as ProfileType,
  postsData: [
    { id: 4, text: '\n\n\n\n', date: '17.06.2020' },
    { id: 3, text: '\n', date: '16.06.2020' },
    { id: 2, text: '\n\n\n\n\n\n\n\n', date: '15.06.2020' },
    { id: 1, text: '\n\n', date: '14.06.2020' },
    { id: 0, text: 'Здесь будут посты,\nкогда backend добавит такую возможность', date: '13.06.2020' },
  ] as PostType[]
}
type InitStateType = typeof initState

const profileReducer = (state: InitStateType = initState, action: any): InitStateType => {
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
          lookingForAJobDescription: action.profile.lookingForAJobDescription,
          photos: { ...action.profile.photos },
          contacts: { ...action.profile.contacts},
        }
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profileData: { ...initState.profileData },
      }
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          photos: action.photos
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
    case ADD_POST:
      const id = state.postsData.length;
      return {
        ...state,
        postsData: [...state.postsData, {id: id, text: action.text, date: dateFormat(new Date())}],
      }
    default:
      return state;

  }
};

type AddNewPostActionType = {type: typeof ADD_POST, text: string}
export const addNewPost = (text: string): AddNewPostActionType => ({ type: ADD_POST, text: text });
export const getProfile = (userID: number) => async (dispatch: any) => {
  const data = await API.getProfile(userID);
  dispatch({ type: SET_PROFILE, profile: { ...data } });
};
type ClearProfileActionType = {type: typeof CLEAR_PROFILE}
export const clearProfile = (): ClearProfileActionType => ({ type: CLEAR_PROFILE });
export const setProfilePhoto = (photo: string) => async (dispatch: any) => {
  const data = await API.uploadNewProfilePhoto(photo);
  dispatch({ type: SET_PROFILE_PHOTO, photos: { ...data.photos } });
};
export const setProfileData = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
  await API.uploadNewProfileData(profileData);
  dispatch(getProfile(getState().login.id));
};
export const getStatus = (userID: number) => async (dispatch: any) => {
  const data = await API.getStatus(userID);
  dispatch({ type: SET_STATUS, status: data });
};
export const changeStatus = (newStatusText: string) => async (dispatch: any) => {
  await API.changeStatus(newStatusText)
  dispatch({ type: SET_STATUS, status: newStatusText });
};

export default profileReducer;