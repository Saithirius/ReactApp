import React from "react";
import s from '../MessagesPage.module.css'
import { NavLink } from "react-router-dom";

const Dialog = props => {
  return (
    <NavLink to={'/Messages/' + props.id} className={s.dialog} activeClassName={s.active}>
      {props.name}
    </NavLink>
  );
};

export default Dialog;