import React, {useState} from 'react'
import { connect } from 'react-redux';


import {addSize} from '../usersReduser'
import UserSizeForm from './UserSizeForm';
import UserSizeInfo from './UserSizeInfo';

const UserSize = (props) =>{
    let user = props.user
   let [addMode, setAddMode] = useState(false)

    return <div onDoubleClick = {()=>{setAddMode(false)}}>

        {addMode?<UserSizeForm setAddMode={setAddMode} addSize={addSize}/>:<UserSizeInfo setAddMode={setAddMode} user={user} />||'size'}



      
    </div>
}

const mstp = (state)=>{
    return {
        user:state.currentUser
    }
}


 export default  connect(mstp,{addSize})(UserSize)