import React, { useState} from 'react'
import User from './User';
import {connect} from 'react-redux'
import { setCurrentUser, addUser } from './../usersReduser';
import loader from '../img/loader.gif'



function Users({users, setCurrentUser, addUser, isFetching}) {
    
    let [newUser, setUser] = useState('')
    let [addMode, setAddMode] = useState(false)
    
    const addNewUser = (e)=>{
         e.preventDefault()
        addUser(newUser, users)
        setAddMode(false)
    }

    return (
        
        !isFetching ? <div>
            <ul style ={{'display':'block'}} onDoubleClick={()=>{setAddMode(false)}}>
            {users.length?users.map((user, i) =>{
                return <User name ={i} user={user} key={user.name} setCurrentUser = {setCurrentUser} users={users}/>
            }) : "no users"}
            </ul>
            {addMode?
            <form  onSubmit = {(e)=>{ addNewUser(e); }} >
            <input  type="text" value = {newUser} placeholder='введите имя' className = 'form__text-input' onChange={(e)=>{setUser(e.target.value)}}/>
            <input type="submit" value = 'add user' className = 'form__submit-input'/>
        </form>: <button onClick = {()=>{setAddMode(true)}}>Add User</button>
}
        </div>
        : <img src={loader} alt="" className = 'loader'/>
    
    )
}

const mstp = (state)=>{
     return { }
}

export default connect(mstp, {setCurrentUser, addUser})(Users)