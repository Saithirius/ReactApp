import React from 'react';
import { connect } from 'react-redux';
import s from './ProfileInfo.module.css';
import StatusContainer from './StatusContainer';
import { setProfilePhoto } from "../../../redux/profile-reducer";
import Contacts from './Contacts';
import { NavLink } from 'react-router-dom';

const ProfileInfo = (props) => {

  const setNewProfilePhoto = (e) => {
    e.preventDefault();
    const photo = e.target.files[0];
    photo && props.setProfilePhoto(photo);
  }
  

  return (
    <div className={s.profileInfo}>
      {/* Фото профиля */}
      <div className={s.profilePhotoBlock}>
        <img className={s.profilePhoto} src={props.profileData.photos.large} alt=""></img>
        {props.isOwner && <label htmlFor='file-upload' className={s.customFileUpload}>Обновить фотографию</label>}
        <input className={s.inputPhoto} type='file' onChange={setNewProfilePhoto} id="file-upload" accept='.jpg, .jpeg, .png' />
        {props.isOwner && <NavLink to='/EditProfile' ><p className={s.customFileUpload}>Редактировать страницу</p></NavLink>}
      </div>
      
      {/* Инфо*/}
      <div className={s.info}>

        {/* Имя, статус */}
        <div className={s.top}>
          <p className={s.name}><strong>{props.profileData.name}</strong></p>
          <StatusContainer status={props.profileData.status} isOwner={props.isOwner} />
        </div>

        {/* Инфо */}
        <div className={s.bottom}>
          <div className={s.bottomItem}>
            {props.profileData.aboutMe && <p><strong>Обо мне:</strong> {props.profileData.aboutMe}</p>}
          </div>
          <div className={s.bottomItemq}>
            <p>{props.profileData.lookingForAJob ? <strong>Ищу работу!</strong> : <strong>Работу не ищу =Р</strong>}</p>
            {props.profileData.lookingForAJob && <p>{props.profileData.lookingForAJobDescription}</p>}
          </div>
          <Contacts contacts={props.profileData.contacts} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profilePage.profileData,
  };
};

export default connect(mapStateToProps, {setProfilePhoto})(ProfileInfo);