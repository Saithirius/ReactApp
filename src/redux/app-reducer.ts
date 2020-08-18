import { checkAuth } from "./auth-reducer";
import { getProfile } from "./profile-reducer";

const INIT_SUCCESSFUL = 'appReducer/INIT_SUCCESSFUL';

type InitialStateType = {init: boolean};
let initialState: InitialStateType = {
  init: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {

    case INIT_SUCCESSFUL:
      return {
        ...state,
        init: true,
      };

    default:
      return state;
  }
};

type InitSuccessfulActionType = {type: typeof  INIT_SUCCESSFUL};
const initSuccessful = (): InitSuccessfulActionType => ({type: INIT_SUCCESSFUL});

export const startInit = () => async (dispatch: any, getState: any) => {
  const checkAuthPromise = dispatch(checkAuth());
  const myId = getState().login.id;
  const getMyProfile = myId && dispatch(getProfile(myId))
  await Promise.all([checkAuthPromise, getMyProfile]);
  dispatch(initSuccessful());
};

export default appReducer;