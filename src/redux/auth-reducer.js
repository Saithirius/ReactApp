import { API } from "../api/api";
import { stopSubmit } from "redux-form";

const LOGIN = 'authReducer/LOGIN';
const LOGOUT = 'authReducer/LOGOUT';
const SET_ISFETCHING = 'authReducer/SET-ISFETCHING';
const GET_CAPTCHA = 'authReducer/GET-CAPTCHA';

let initialState = {
  id: null,
  userName: null,
  email: null,
  isAuth: false,
  captcha: null,
  isFetching: false
}

const authReducer = (state = initialState, action) => {
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

    case SET_ISFETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };

    default:
      return state;

  }
};

const setAuthorizedUser = (data) => ({ type: LOGIN, id: data.id, userName: data.login, email: data.email });

export const login = (formData) => async (dispatch) => {
  dispatch({ type: SET_ISFETCHING, isFetching: true })
  const data = await API.login(formData);
  switch (data.resultCode) {
    case 0:
      dispatch(checkAuth())
      break;
      case 1:
        dispatch(stopSubmit('login', { _error: 'Неверный email или пароль' }))
        dispatch({ type: SET_ISFETCHING, isFetching: false })
        break;
        case 10:
          dispatch(stopSubmit('login', { _error: 'Нужно ввести капчу' }))
          dispatch(getCaptcha())
          dispatch({ type: SET_ISFETCHING, isFetching: false })
          break;
          default:
            break;
          }
        };
        
const getCaptcha = () => async (dispatch) => {
  const data = await API.getCaptcha();
  dispatch({ type: GET_CAPTCHA, captcha: data.url })
};

export const logout = () => async (dispatch) => {
  const data = await API.logout();
  (data.resultCode === 0) ? dispatch(checkAuth()) : alert('Не удалось выйти');
};

export const checkAuth = () => async (dispatch) => {
  const data = await API.checkAuth();
  switch(data.resultCode){
    case 0:
      dispatch({ type: SET_ISFETCHING, isFetching: false })
      return dispatch(setAuthorizedUser(data.data));

    case 1:
      return dispatch({ type: LOGOUT });

    default:
      return;
  }
};

export default authReducer;