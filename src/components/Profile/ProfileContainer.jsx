import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { clearProfile, getProfile, getStatus } from "../../redux/profile-reducer";
import Preloader from '../common/preloader';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfilePostsContainer from './ProfilePosts/ProfilePostsContainer';


const ProfilePage = (props) => {

  const isOwner = props.myID === props.profileData.userID;

  useEffect( () => {
    props.clearProfile();
    props.getProfile(props.match.params.userID);
    props.getStatus(props.match.params.userID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.userID])

  return (
    <div className={s.Profile}>
      {/* Добавить триггер полной загрузки страницы, а не смотреть на ID */}
      {props.profileData.userID ? <ProfileInfo isOwner={isOwner} /> : <Preloader />}
      <ProfilePostsContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.profilePage.profileData,
    myID: state.login.id,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { getProfile, getStatus, clearProfile }),
)(ProfilePage);