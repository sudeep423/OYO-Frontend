import React, { Component, } from 'react';
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as actions from './store/actions/index'
import OwnerFront from './containers/Hotels/Hotel'
import HotelSignUp from './containers/Hotels/Auth/SignUp/SignUp'
import HotelLogin from './containers/Hotels/Auth/Login/Login'
import User from './containers/User/User'
import UserSignUp from './containers/User/Auth/SignUp/SignUp'
import UserLogin from './containers/User/Auth/Login/Login'
import Search from './containers/Search/Search'
import Hotel from './containers/Hotel/Hotel'
import UserLogout from './containers/User/Auth/Logout/Logout'


const asyncAuthLogin = asyncComponent(() => {
  return import('./containers/Auth/Login/Login')
})

const asyncAuthSignUp = asyncComponent(() => {
  return import('./containers/Auth/SignUp/SignUp')
})

const asyncFront = asyncComponent(() => {
  return import('./containers/Front/Front')
})


class App extends Component {

  // componentDidMount() {
  //   this.props.onTryAutoSignup()
  // }
  render() {

    const userId = localStorage.getItem('userId')


    let routes = (
      <Switch>
        <Route path="/auth/login" component={asyncAuthLogin} />
        <Route path="/auth/signup" component={asyncAuthSignUp} />
        <Route path="/user/auth/signup" component={UserSignUp} />
        <Route path="/user/auth/login" component={UserLogin} />
        <Route path="/user" component={User} />
        <Route path="/Hotel" component={Hotel} />
        <Route path="/owner/auth/signup" component={HotelSignUp} />
        <Route path="/owner/auth/login" component={HotelLogin} />
        <Route path="/owner" component={OwnerFront} />
        <Route path="/search" component={Search} />
        <Route to='/' component={asyncFront} />
      </Switch>
    )

    console.log(userId)

    if (userId != null) {
      console.log("help1")
      routes = (
        <Switch>
          <Route path="/Hotel" component={Hotel} />
          <Route path="/search" component={Search} />
          <Route path="/user/logout" component={UserLogout} />
        </Switch>
      )
    }

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/" component={asyncAuthLogin} />
    //       <Redirect to='/' />
    //     </Switch>
    //   )
    // }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.userAuth.userId !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect()(App));
