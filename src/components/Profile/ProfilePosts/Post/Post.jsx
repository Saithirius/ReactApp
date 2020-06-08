import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.post}>

      <div className={s.header}>
        <img className={s.profilePhoto} src={props.userPhoto} alt=''></img>
        <div className={s.nameAndDate}>
          <p className={s.name}>{props.userName}</p>
          <p className={s.date}>{props.post.date}</p>
        </div>
      </div>

      <p className={s.postContent}>{props.post.text}</p>
    </div>
  );
}

export default Post;