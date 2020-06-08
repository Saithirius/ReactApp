import React from 'react';
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = props => {
  return (
    <nav className={s.Navbar}>
      <NavLink className={s.item} to={props.myID ? '/Profile/' + props.myID : '/Login'}>Мой профиль</NavLink>
      <NavLink className={s.item} to='/Messages'>Сообщения</NavLink>
      <NavLink className={s.item} to='/Friends'>Друзья</NavLink>
      <NavLink className={s.item} to='/News'>Новости</NavLink>
      <NavLink className={s.item} to='/Settings'>Настройки</NavLink>
    </nav>
  );
}


const mapStateToProps = (state) => {
  return {
    myID: state.login.id,
  }
};

export default connect(mapStateToProps, {})(Navbar);