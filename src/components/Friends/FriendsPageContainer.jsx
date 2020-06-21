import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearAllUsers, getUsers, setTerm, toggleFollow } from "../../redux/friends-reducer";
import Preloader from "../common/preloader";
import s from "./FriendsPage.module.css";
import User from "./User";
import { useState } from "react";

const FriendsPage = (props) => {

  const searchRef = React.createRef();
  const [searchMod, setSearchMod] = useState(false);

  useEffect(() => {
    props.clearAllUsers();
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(searchMod) searchRef.current.focus()
  }, [searchMod, searchRef]);

  const getUsers = () => {
    setSearchMod(false)
    props.getUsers();
  };

  const searchUser = (e) => {
    setSearchMod(true);
    props.clearAllUsers();
    props.setTerm(e.target.value);
    props.getUsers();
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
    term: state.friendPage.term,
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
