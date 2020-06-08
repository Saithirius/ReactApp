import React from "react";
import s from '../MessagesPage.module.css';
import { Field, reduxForm } from "redux-form";
import { notEmpty } from "../../../utils/validator";
import { Textarea } from "../../common/Forms/Forms";

const NewMessageForm = props => {
  return (
    <form className={s.newMessageForm} onSubmit={props.handleSubmit}>
      <Field name={"newMessageText"} placeholder='Новое сообщение' rows='3' maxLength='300' validate={[notEmpty]} component={Textarea}/>
      <button className={s.newMessageButton}>Отправить</button>
    </form>
  );
};

const newMessageReduxForm = reduxForm({ form: "newMessageForm" })(NewMessageForm);

export default newMessageReduxForm;