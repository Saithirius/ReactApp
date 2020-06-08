import React from "react";
import { connect } from "react-redux";
import logoPNG from "../../assets/img/logo.png";
import logoSVG from "../../assets/img/logo.svg";
import { checkAuth, logout } from '../../redux/auth-reducer';
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const HeaderContainer = (props) => {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        {/* Лого */}
        <object className={s.logo} type="image/svg+xml" data={logoSVG}>
          <img className={s.logo} src={logoPNG} alt="" />
        </object>

        {/* Аутентификация */}
        <div className={s.login}>{
          props.isAuth ? 
          <p className={s.logout} onClick={props.logout} >Выход</p> :
          <NavLink to='/Login'>Вход</NavLink>
        }</div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return{
    id: state.login.id,
    userName: state.login.userName,
    email: state.login.email,
    isAuth: state.login.isAuth,
  }
}

export default connect(mapStateToProps, {checkAuth, logout})(HeaderContainer);
