const SEND_MESSAGE = 'messagesReducer/SEND-MESSAGE';

let initialState = {
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
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {

    case SEND_MESSAGE:
      const text = action.text.trim();
      if (text) {
        return {
          ...state,
          messagesData: [...state.messagesData, { id: state.messagesData.length, text: text }]
        }
      }
      return state;
      
    default:
      return state;

  };
};

export const sendMessage = (text) => ({ type: SEND_MESSAGE, text: text });

export default messagesReducer;