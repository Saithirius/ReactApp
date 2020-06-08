import React from "react";
import s from "./FriendsPage.module.css";
import Friend from "./Friend";
import Preloader from "../common/preloader";

let Friends = (props) => {
  return (
    <div className={s.friendsPageMain}>
      {props.users.map((u) => (
        <Friend user={u} key={u.id} follow={props.follow} unfollow={props.unfollow} />
      ))}
      {props.isFetching ? 
      <Preloader /> : 
      <button onClick={props.getUsers} className={s.moreBtn}>Ещё</button>}
    </div>
  );
};

export default Friends;
