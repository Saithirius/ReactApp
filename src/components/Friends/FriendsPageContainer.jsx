import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearAllUsers, getUsers, setTerm, toggleFollow } from "../../redux/friends-reducer";
import Preloader from "../common/preloader";
import s from "./FriendsPage.module.css";
import User from "./User";

const FriendsPage = (props) => {

  const searchRef = React.createRef();

  useEffect(() => {
    props.clearAllUsers();
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => searchRef.current.focus(), [searchRef]);

  const getUsers = () => {
    props.getUsers();
  };

  const searchUser = (e) => {
    props.clearAllUsers();
    props.setTerm(e.target.value);
    getUsers();
  }

  return (
    <div className={s.friendsPageMain}>
      {/* Поиск по имени */}
      <input  className={s.searchInput}
              placeholder='Поиск' 
              onChange={searchUser} 
              disabled={props.isFetching} 
              autoFocus={true} 
              maxLength='30'
              ref={searchRef}/>
      {/* Друзья */}
      {Boolean(props.friends.length) && <h2>Друзья</h2>}
      {props.friends.map((u) => (<User user={u} key={u.id} isAuth={props.isAuth} toggleFollow={props.toggleFollow} />))}
      {/* Пользователи */}
      {Boolean(props.users.length) && <h2>Пользователи</h2>}
      {props.users.map((u) => (<User user={u} key={u.id} isAuth={props.isAuth} toggleFollow={props.toggleFollow} />))}
      {/* Кнопка "ещё" */}
      {props.isFetching ?
      <Preloader /> :
      !props.endedUsers && <button onClick={getUsers} className={s.moreBtn}>Ещё</button>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    friends: state.friendPage.friends,
    users: state.friendPage.users,
    endedUsers: state.friendPage.endedUsers,
    isFetching: state.friendPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  toggleFollow,
  clearAllUsers,
  getUsers,
  setTerm,
})(FriendsPage);
