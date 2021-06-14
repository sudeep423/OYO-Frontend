import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import * as actions from '../../store/actions/index';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })
    }

    onClickLogout = () => {
        console.log("kick in his ass")
        this.props.userLogout()
    }

    render() {

        const userId = localStorage.getItem('userId')
        console.log(userId)
        return (
            <Aux >
                <Toolbar
                    isAuth={userId ? true : false}
                    clicked={this.SideDrawerToggleHandler}
                    clickLogout={this.onClickLogout} />
                <SideDrawer
                    isAuth={userId ? true : false}
                    clicked={this.SideDrawerClosedHandler}
                    show={this.state.showSideDrawer} />
                <div>Toolbar , SideDrawer ,Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null
//     }
// }
const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(actions.userLogout())
    }
}


export default connect()(Layout)