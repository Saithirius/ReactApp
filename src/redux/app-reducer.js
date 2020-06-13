import { checkAuth } from "./auth-reducer";
import { getProfile } from "./profile-reducer";

const INIT_SUCCESSFUL = 'appReducer/INIT_SUCCESSFUL';

let initialState = {
  init: false,
}

const appReducer = (state = initialState, action) => {
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

const initSuccessful = (data) => ({type: INIT_SUCCESSFUL});

export const startInit = () => async (dispatch, getState) => {
  const checkAuthPromise = dispatch(checkAuth());
  const getMyProfile = dispatch(getProfile(getState().login.id))
  await Promise.all([checkAuthPromise, getMyProfile]);
  dispatch(initSuccessful());
};

export default appReducer;