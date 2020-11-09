import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../img/logo.png'
import { firebaseApp } from './../App';

function Header({setInit, isInit, admin}) {
    const signOut = ()=>{
        firebaseApp.auth().signOut().then(function() {
            setInit(false)
          }).catch(function(error) {
            alert(error.message)
          });
    }
    return (
        <div className = 'header'>
            <NavLink to='/'><img src={logo} className = 'logo'/></NavLink>
            <nav>
            <ul>
                {isInit?<li onClick = {signOut}>hello, {admin}</li>: <li>Sign in</li>}
                <li><NavLink to='/users'>Users</NavLink></li>
            </ul>
            </nav>
      </div>
    )
}

export default Header
