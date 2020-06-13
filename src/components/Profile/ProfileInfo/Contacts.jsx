import React from 'react';
import s from './ProfileInfo.module.css'

export default (props) => {
  const contacts = [];
  for (let [key, value] of Object.entries(props.contacts)) {
    if (value){
      const newValue = value.replace(/https?:\/\//, '')
      contacts.push(<p key={key}>{key}: <a href={`http://${newValue}`}><i>{newValue}</i></a></p>);
    }
  }

  return Boolean(contacts.length) && 
    <div className={s.contacts+' '+s.bottomItem}>
      <b>Контакты:</b>
      <div className={s.contactsItem}>{ contacts }</div>
    </div>
}