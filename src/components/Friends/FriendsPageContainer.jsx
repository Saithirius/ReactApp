import React from "react";
import Friends from "./Friends";
import { connect } from "react-redux";
import {follow, unfollow, clearAllUsers, getUsers} from "../../redux/friends-reducer";
import { useEffect } from "react";

const FriendsPage = (props) => {
  useEffect(() => {
    console.log('useEffect');
    !props.users.length && getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.users.length]);

  const getUsers = () => {
    props.getUsers(props.currentPage);
  };

  console.log('render');
  return (
    <Friends users={props.users} follow={props.follow} unfollow={props.unfollow} getUsers={getUsers} isFetching={props.isFetching}/>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.friendPage.users,
    currentPage: state.friendPage.currentPage,
    isFetching: state.friendPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  clearAllUsers,
  getUsers,
})(FriendsPage);
