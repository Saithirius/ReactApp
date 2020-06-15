import React from "react";
import s from "./FriendsPage.module.css";
import { NavLink } from "react-router-dom";

const User = (props) => {
  return (
    <div className={s.User}>
      <div className={s.left}>

        {/* Фото\ссылка */}
        <NavLink to={'/Profile/' + props.user.id}><img src={props.user.photos.small} alt="" /></NavLink>

        {/* Подписаться */}
        <button disabled={props.user.followToggle} onClick={() => props.toggleFollow(props.user.id, props.user.followed)}>
          {props.user.followed ? 'Отписаться' : 'Подписаться'}
        </button>

      </div>
      <div className={s.right}>
        {/* Имя, статус */}
        <NavLink to={'/Profile/' + props.user.id}><strong>{props.user.name}</strong></NavLink>
        <p className={s.status}>{props.user.status ? `"${props.user.status}"` : null}</p>
      </div>
    </div>
  );
};

export default User;
