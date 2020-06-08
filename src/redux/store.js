import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";

let store = {

  _state: {
    messagesPage: {
      messagesData: [
        { id: 0, text: 'Привет' },
        { id: 1, text: 'Как твои дела?' },
        { id: 2, text: 'Чем занимаешься?' },
      ],

      dialogsData: [
        { id: 0, name: 'Петя' },
        { id: 1, name: 'Ваня' },
        { id: 2, name: 'Маша' },
        { id: 3, name: 'Саша' }
      ]
    },

    profilePage: {
      postsData: [
        { id: 0, text: 'Первый пост на странице!' },
        { id: 1, text: 'Второй пост на странице!' },
        { id: 2, text: 'Третий пост на странице!' },
        { id: 3, text: 'Реклама!' },
        { id: 4, text: 'Один из недавних постов' },
        { id: 5, text: 'Текст крайнего поста' },
      ]
    }
  },
  _callSubscriber() {
    console.log('State chaged');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer (this._state.messagesPage, action);
    this._callSubscriber(this);
  }
};

export default store;