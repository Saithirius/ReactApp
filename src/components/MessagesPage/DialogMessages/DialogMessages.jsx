import React from "react";
import Message from './Message/Message'

const DialogMessages = props => {
  return props.dialogMessagesData.map( message => <Message  key={message.id} message={message.text}/>);
};

export default DialogMessages;
