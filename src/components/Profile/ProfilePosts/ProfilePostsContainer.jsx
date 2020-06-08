import React from 'react';
import { connect } from 'react-redux';
import { addNewPost } from '../../../redux/profile-reducer';
import NewPost from './NewPost/NewPost';
import Post from './Post/Post';
import s from './ProfilePosts.module.css';

const ProfilePosts = props => {
  let posts = props.postsData.map( post => <Post post={post} userName={props.userName} userPhoto={props.userPhoto} key={post.id}/>).reverse();
  const addNewPost = (formData) => props.addNewPost(formData.newPostText);
  return (
    <div className={s.MyPosts}>
      { (props.myID === props.userID) && <NewPost onSubmit={addNewPost}/> }
      {posts}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    userID: state.profilePage.profileData.userID,
    userName: state.profilePage.profileData.name,
    userPhoto: state.profilePage.profileData.photos.small,
    myID: state.login.id,
  }
};

export default connect(mapStateToProps, {addNewPost})(ProfilePosts);