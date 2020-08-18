const SEND_MESSAGE = 'messagesReducer/SEND-MESSAGE';

type InitialStateType = {
  messagesData: {id: number, text: string}[],
  dialogsData: {id: number, name: string}[]
}

let initialState: InitialStateType = {
  messagesData: [
    { id: 0, text: 'Тут будут диалоги' },
    { id: 1, text: 'Когда backend добавит такую возможность)' },
  ],
  dialogsData: [
    { id: 0, name: 'Петя' },
    { id: 1, name: 'Ваня' },
    { id: 2, name: 'Маша' },
    { id: 3, name: 'Саша' }
  ]
}

const messagesReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageActionType = {type: typeof SEND_MESSAGE, text: string};
export const sendMessage = (text: string): SendMessageActionType => ({ type: SEND_MESSAGE, text: text });

export default messagesReducer;