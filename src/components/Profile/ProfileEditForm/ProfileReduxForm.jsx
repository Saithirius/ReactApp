import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { maxLength, required } from "../../../utils/validator";
import { Input } from "../../common/Forms/Forms";
import { withAuthRedirectComponent } from "../../HOC/authRedirect";
import s from './ProfileEditForm.module.css';
import { setProfileData } from "../../../redux/profile-reducer";

const maxLength30 = maxLength(30);


const contacts = (contacts) => {
   return Object.keys(contacts).map( key => {
    return <Field name={'contacts.' + key} key={key} placeholder={key} validate={[maxLength30]} component={Input} />
  });
}

const ProfileEditForm = props => {
  const onSubmit = (formData) => {
    props.setProfileData(formData);
  };
  const initialValues = {...props.profileData, fullName: props.profileData.name};
  return (
    <div>
      <ProfileReduxForm initialValues={initialValues} onSubmit={onSubmit} profileData={props.profileData} />
    </div>
  );
};

const ProfileForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.formItem}>
        <label className={s.formItemLabel}>Имя:</label>
        <Field name={'fullName'} placeholder='Имя' validate={[required, maxLength30]} component={Input}/>
      </div>
      <div className={s.formItem}>
        <label className={s.formItemLabel}>Обо мне:</label>
        <Field name={"aboutMe"} placeholder="Обо мне:" validate={[maxLength30]} component={Input}/>
      </div>
      <div className={s.formItem}>
        <Field name={"lookingForAJob"} type="checkbox" component={"input"} />
        Ищу работу
      </div>
      <div className={s.formItem}>
        <label className={s.formItemLabel}>Проффесия, навыки, образование:</label>
        <Field name={'lookingForAJobDescription'} placeholder='Проффесия, навыки, образование:' validate={[maxLength30]} component={Input}/>
      </div>
      <div className={s.formItem}>
        <label className={s.formItemLabel}>Контакты:</label>
        {contacts(props.profileData.contacts)}
      </div>
      <button>Сохранить</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.profilePage.profileData,
  }
}

const ProfileReduxForm = reduxForm({ form: 'profile' })(ProfileForm);

export default compose(
  connect(mapStateToProps, { setProfileData }),
  withAuthRedirectComponent,
)(ProfileEditForm);