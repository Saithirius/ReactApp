import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import profileReducer from "./profile-reducer"
import friendsReducer from "./friends-reducer"
import messagesReducer from "./messages-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  friendPage: friendsReducer,
  login: authReducer,
  form: formReducer,
  app: appReducer
});

export type RootReducerType = typeof rootReducer

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store