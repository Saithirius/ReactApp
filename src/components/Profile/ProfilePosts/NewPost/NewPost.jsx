import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLength, notEmpty } from '../../../../utils/validator';
import { Textarea } from '../../../common/Forms/Forms';
import s from './NewPost.module.css';

const maxLength30 = maxLength(30);
const newPostForm = (props) => {
  return (
    <form className={s.newPostForm} onSubmit={props.handleSubmit}>
      <div className={s.newPostText}>
        <Field name={"newPostText"} placeholder="Что у вас нового?" rows="3" validate={[notEmpty, maxLength30]} component={Textarea}/>
      </div>
      <button className={s.newPostButton}>Отправить</button>
    </form>
  );
};

const newPostReduxForm = reduxForm({ form: "newPostForm" })(newPostForm);

export default newPostReduxForm; 