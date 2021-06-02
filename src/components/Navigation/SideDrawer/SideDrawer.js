import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]

    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked} />
            <div className={attachedClasses.join(' ')} onClick={props.clicked}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer