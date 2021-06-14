import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuthenticated ? <NavigationItem link="/userAuth/signup" exact>SIGN UP</NavigationItem> : <NavigationItem link="/user/logout" exact>LOGOUT</NavigationItem>}
        {!props.isAuthenticated ? <NavigationItem link="/userAuth/login" exact>LOGIN</NavigationItem> : null}
    </ul>
)

// {!props.isAuthenticated
//     ? <NavigationItem link="/" >Authenticate</NavigationItem>
//     : <NavigationItem link="/" >Logout</NavigationItem>}



export default navigationItems