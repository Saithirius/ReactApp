import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import MessagesPageContainer from './components/MessagesPage/MessagesPageContainer';
import FriendsPageContainer from './components/Friends/FriendsPageContainer';
import ProfilePageContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { connect } from 'react-redux';
import { startInit } from './redux/app-reducer';
import Preloader from './components/common/preloader';
import { compose } from 'redux';

class App extends Component {

  componentDidMount(){
    this.props.startInit();
  }

  render() {
    if (!this.props.init) return <Preloader />;

    return (
        <div className="Page">
          <HeaderContainer />
          <div className="Wrapper">
            <Navbar />
            <div className="Wrapper-content">
              <Switch>
                <Route path='/Profile/:userID' render={() => <ProfilePageContainer />} />
                <Route path='/Messages' render={() => <MessagesPageContainer />} />
                <Route path='/Friends' render={() => <FriendsPageContainer />} />
                <Route path='/News' component={News} />
                <Route path='/Settings' component={Settings} />
                <Route path='/Login' component={() => <Login />} />
                <Route exact path='/' render={() => <Redirect to='/Profile/7830' />} />
                <Route path='*' component={() => <h1>Ошибка 404, нет такой страницы!</h1>} />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    init: state.app.init
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, {startInit})
  )(App);
