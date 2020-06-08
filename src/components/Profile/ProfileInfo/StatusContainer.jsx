import React from "react";
import { connect } from "react-redux";
import { changeStatus } from "../../../redux/profile-reducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import s from "./ProfileInfo.module.css";
import { useState } from "react";
import { useEffect } from "react";

const Status = (props) => {

  let [status, setStatus] = useState(props.status);
  let [statusEditMode, changeStatusEditMode] = useState(false);

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  const setNewStatus = () => {
    if (props.status !== status) {
      props.changeStatus(status);
    }
    changeStatusEditMode(false);
  };

  const changeStatus = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    (props.myID === props.userID) ?
      // На моей странице
      ( statusEditMode ? 
        <input className={s.statusInput} value={status} onChange={changeStatus} autoFocus onBlur={setNewStatus} type="text" maxLength="50"></input> :
        <p className={s.statusText} onClick={() => changeStatusEditMode(true)}>{props.status ? props.status : "Изменить статус"}</p>
      ) :
      // На чужой странице
      <p className={s.status}>{props.status}</p>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.profilePage.profileData.status,
    userID: state.profilePage.profileData.userID,
    myID: state.login.id,
  };
};

export default compose(
  connect(mapStateToProps, { changeStatus }),
  withRouter
)(Status);
