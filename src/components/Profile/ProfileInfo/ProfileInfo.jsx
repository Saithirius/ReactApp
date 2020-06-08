import React from 'react';
import s from './ProfileInfo.module.css';
import StatusContainer from './StatusContainer';

const ProfileInfo = (props) => {

  return (
      <div className={s.profileInfo}>
        {/* Фото профиля */}
        <img className={s.profilePhoto} src={props.profileData.photos.large} alt=""></img>
        
        {/* Инфо*/}
        <div className={s.info}>

          {/* Имя, статус */}
          <div className={s.top}>
            <p className={s.name}><strong>{props.profileData.name}</strong></p>
            <StatusContainer />
          </div>

          {/* Инфо */}
          <div className={s.bottom}>
            {props.profileData.aboutMe && <p><strong>Обо мне:</strong> {props.profileData.aboutMe}</p>}
            <p>{props.profileData.lookingForAJob ? <strong>Ищу работу!</strong> : <strong>Работу не ищу =Р</strong>}</p>
          </div>
        </div>
      </div>
    );
}

export default ProfileInfo;