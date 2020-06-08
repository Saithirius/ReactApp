import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendMessage } from "../../redux/messages-reducer";
import { withAuthRedirectComponent } from "../HOC/authRedirect";
import DialogMessages from "./DialogMessages/DialogMessages";
import NewMessage from "./DialogMessages/NewMessage";
import Dialogs from "./Dialogs/Dialogs";
import s from "./MessagesPage.module.css";


const MessagesPage = props => {

  const sendMessage = formData => {
    props.sendMessage(formData.newMessageText)
  };

  return (
    <div className={s.messagesPage}>
      {/* Диалоги */}
      <div className={s.dialogs}>
        <Dialogs dialogsData={props.dialogsData} />
      </div>

      {/* Сообщения в диалоге */}
      <div className={s.dialogMessages}>
        <div id='messagesWrapper' className={s.messagesWrapper}>
          <DialogMessages dialogMessagesData={props.dialogMessagesData} />
        </div>
        <NewMessage onSubmit={sendMessage} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    dialogMessagesData: state.messagesPage.messagesData,
  };
};

export default compose(
  connect(mapStateToProps, {sendMessage}),
  withAuthRedirectComponent
)(MessagesPage);