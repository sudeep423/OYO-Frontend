import React, { Component, } from 'react';
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as actions from './store/actions/index'


const asyncAuthLogin = asyncComponent(() => {
  return import('./containers/Auth/Login/Login')
})

const asyncAuthSignUp = asyncComponent(() => {
  return import('./containers/Auth/SignUp/SignUp')
})
class App extends Component {

  // componentDidMount() {
  //   this.props.onTryAutoSignup()
  // }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth/login" component={asyncAuthLogin} />
        <Route path="/auth/signup" component={asyncAuthSignUp} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" component={asyncAuthLogin} />
          <Redirect to='/' />
        </Switch>
      )
    }

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
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect()(App));
