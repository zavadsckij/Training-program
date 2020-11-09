import React from 'react'
import { NavLink } from 'react-router-dom';
import { removeUser } from '../usersReduser';
import { connect } from 'react-redux';

const User = ({user, name, setCurrentUser, removeUser, users}) =>{


    
    return <li>
    <NavLink to ={ `users/${name}`} onClick={()=>{
               setCurrentUser(user)
           }}>{user.name} </NavLink>
           <button onClick ={()=>{
               removeUser( users.filter(u => u.name !== user.name))
               }}>delete</button>
     </li>
}

export default connect(()=>({}), {removeUser})(User)