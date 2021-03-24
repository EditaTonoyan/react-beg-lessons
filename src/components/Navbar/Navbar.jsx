import React from 'react'
import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css';

const navlinks = [
    {
        to:"/",
        exact:true,
        value:"Home"
    },
    {
        to:"/contact",
        exact:true,
        value:"Contact"
    },
    {
        to:"/about_us",
        exact:true,
        value:"About"
    }

]
export default function Navbar() {
    const getnavLink = navlinks.map((navlink,index) => {
        return (
            <Nav.Item key = {index} activeClassName = {styles.navItemStyle}>
            <NavLink 
                to={navlink.to}
                className="nav-link"
                activeStyle={{color:'red'}}
                exact={navlink.exact}
             >
                 {navlink.value}
            </NavLink>
        </Nav.Item>
        )
    })
    return (
        <div className={styles.body}>
           
            <Nav variant="tabs">
                {getnavLink}
            </Nav>
        </div>
    )
}
