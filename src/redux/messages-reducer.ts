import {DialogsType, MessageType} from "../utils/types";

const SEND_MESSAGE = 'messagesReducer/SEND-MESSAGE';

let initialState = {
  messagesData: [
    { id: 0, text: 'Тут будут диалоги' },
    { id: 1, text: 'Когда backend добавит такую возможность)' },
  ] as MessageType[],
  dialogsData: [
    { id: 0, name: 'Петя' },
    { id: 1, name: 'Ваня' },
    { id: 2, name: 'Маша' },
    { id: 3, name: 'Саша' }
  ] as DialogsType[]
}
type InitialStateType = typeof initialState;

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