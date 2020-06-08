import React from "react";
import s from "./login.module.css";
import { reduxForm, Field } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { required, maxLength } from "../../utils/validator";
import { Input } from "../common/Forms/Forms";
import { Redirect } from "react-router-dom";
import formStyle from '../common/Forms/Form.module.css'

const maxLength30 = maxLength(30);

let Login = props => {

  if (props.isAuth) return <Redirect to={'/Profile/' + props.myID} />;

  let onSubmit = (formData) => {
    props.login(formData);
  };

  return (
    <div className={s.loginPage}>
      <h2 className={s.header}>вход</h2>
      <LoginReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
    </div>
  );
};

const LoginForm = (props) => {
  return (
    <form className={s.loginForm} onSubmit={props.handleSubmit} autoComplete="true">
      { props.error && <div className={formStyle.formError}>{props.error}</div> }
      <div className={s.loginField}>
        <Field name={"email"} placeholder="Электронная почта" type="email" validate={[required, maxLength30]} component={Input}/>
      </div>
      <div className={s.loginField}>
        <Field name={"password"} placeholder="Пароль" type="password" validate={[required, maxLength30]} component={Input}/>
      </div>
      <div className={s.loginRememberMe + " " + s.loginField}>
        <Field name={"rememberMe"} type="checkbox" component={"input"} />
        запомнить меня
      </div>
      <button className={s.loginButton} disabled={props.isFetching}>Войти</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    myID: state.login.id,
    isFetching: state.login.isFetching
  };
};

export default connect(mapStateToProps, { login })(Login);
