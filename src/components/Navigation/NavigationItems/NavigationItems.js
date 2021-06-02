import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/auth/signup" exact>SIGN UP</NavigationItem>
        <NavigationItem link="/auth/login" exact>LOGIN</NavigationItem>
    </ul>
)

// {!props.isAuthenticated
//     ? <NavigationItem link="/" >Authenticate</NavigationItem>
//     : <NavigationItem link="/" >Logout</NavigationItem>}



export default navigationItems