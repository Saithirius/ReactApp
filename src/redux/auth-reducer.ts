import { API } from "../api/api";
import { stopSubmit } from "redux-form";

const LOGIN = 'authReducer/LOGIN';
const LOGOUT = 'authReducer/LOGOUT';
const SET_IS_FETCHING = 'authReducer/SET-IS-FETCHING';
const GET_CAPTCHA = 'authReducer/GET-CAPTCHA';

let initialState = {
  id: null as number | null,
  userName: null as string | null,
  email: null as string | null,
  isAuth: false,
  captcha: null as string | null,
  isFetching: false
}
type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.id,
        userName: action.userName,
        email: action.email,
        isAuth: true,
        captcha: null,
      };
    case LOGOUT:
      return {
        ...state,
        id: null,
        userName: null,
        email: null,
        isAuth: false,
      };
    case GET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    default:
      return state;
  }
};

type  SetAuthorizedUserActionType = {type: string, id: number, userName: string, email: string};
const setAuthorizedUser = (data: {id: number, email: string, login: string}): SetAuthorizedUserActionType => ({ type: LOGIN, id: data.id, userName: data.login, email: data.email });

export const login = (formData: {email: string, password: string, rememberMe: boolean}) => async (dispatch: any) => {
  dispatch({ type: SET_IS_FETCHING, isFetching: true })
  const data = await API.login(formData);
  switch (data.resultCode) {
    case 0:
      dispatch(checkAuth())
      break;
    case 1:
      dispatch(stopSubmit('login', { _error: 'Неверный email или пароль' }))
      dispatch({ type: SET_IS_FETCHING, isFetching: false })
      break;
    case 10:
      dispatch(stopSubmit('login', { _error: 'Нужно ввести капчу' }))
      dispatch(getCaptcha())
      dispatch({ type: SET_IS_FETCHING, isFetching: false })
      break;
    default:
      break;
  }
};
        
const getCaptcha = () => async (dispatch: any) => {
  const data = await API.getCaptcha();
  dispatch({ type: GET_CAPTCHA, captcha: data.url })
};

export const logout = () => async (dispatch: any) => {
  const data = await API.logout();
  (data.resultCode === 0) ? dispatch(checkAuth()) : alert('Не удалось выйти');
};

export const checkAuth = () => async (dispatch: any) => {
  const data = await API.checkAuth();
  switch(data.resultCode){
    case 0:
      dispatch({ type: SET_IS_FETCHING, isFetching: false })
      return dispatch(setAuthorizedUser(data.data));
    case 1:
      return dispatch({ type: LOGOUT });
    default:
      return;
  }
};

export default authReducer;