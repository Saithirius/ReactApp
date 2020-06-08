import React from "react";
import s from "./FriendsPage.module.css";
import { NavLink } from "react-router-dom";

const Friend = (props) => {
  window.friend = props;
  return (
    <div className={s.friend}>
      <div className={s.left}>

        {/* Фото\ссылка */}
        <NavLink to={'/Profile/' + props.user.id}><img src={props.user.photos.small} alt="" /></NavLink>

        {/* Подписаться */}
        {props.user.followed ? (
          <button disabled={props.user.followToggle} onClick={() => props.unfollow(props.user.id)}>
            Отписаться
          </button>
        ) : (
          <button disabled={props.user.followToggle} onClick={() => props.follow(props.user.id)}>
            Подписаться
          </button>
        )}
      </div>
      <div className={s.right}>
        <NavLink to={'/Profile/' + props.user.id}><strong>{props.user.name}</strong></NavLink>
        <p className={s.status}>{props.user.status ? `"${props.user.status}"` : null}</p>
      </div>
    </div>
  );
};

export default Friend;
