import { checkAuth } from "./auth-reducer";

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

export const startInit = () => async (dispatch) => {
  const checkAuthPromise = dispatch(checkAuth());
  await Promise.all([checkAuthPromise]);
  dispatch(initSuccessful());
};

export default appReducer;