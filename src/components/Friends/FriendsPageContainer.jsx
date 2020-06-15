import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearAllUsers, getUsers, toggleFollow } from "../../redux/friends-reducer";
import Preloader from "../common/preloader";
import User from "./User";
import s from "./FriendsPage.module.css";

const FriendsPage = (props) => {
  useEffect(() => {
    !props.users.length && props.getUsers(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.users.length]);

  const getUsers = () => {
    const isFriends = props.friends.length < props.totalFriends;
    props.getUsers(isFriends);
  };

  return (
    <div className={s.friendsPageMain}>
      {/* Друзья */}
      {Boolean(props.friends.length) && <h2>Друзья</h2>}
      {props.friends.map((u) => (<User user={u} key={u.id} toggleFollow={props.toggleFollow} />))}
      {/* Пользователи */}
      {Boolean(props.users.length) && <h2>Пользователи</h2>}
      {props.users.map((u) => (<User user={u} key={u.id} toggleFollow={props.toggleFollow} />))}
      {/* Кнопка "ещё" */}
      {props.isFetching ?
      <Preloader /> :
      <button onClick={getUsers} className={s.moreBtn}>Ещё</button>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friendPage.friends,
    totalFriends: state.friendPage.totalFriends,

    users: state.friendPage.users,
    totalUsers: state.friendPage.totalUsers,

    isFetching: state.friendPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  toggleFollow,
  clearAllUsers,
  getUsers,
})(FriendsPage);
