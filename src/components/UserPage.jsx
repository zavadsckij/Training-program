import React from 'react'
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { compose } from "redux";
import { setCurrentUser } from './../usersReduser';
import {NavLink} from 'react-router-dom'

const UserPage = (props) =>{
    
    return <div >
        {props.user.name?
        <><h1>
           { props.user.name}
        </h1>
        <ul>
            { Object.keys(props.user).map(key =>{
                if(key!== 'name'){
                    return <li key = {key}>
                    <NavLink to={`/users/${props.match.params.userId}/${key}`}>{key}</NavLink>              
                </li>
                
                }
                return null
            })}
        </ul></>
           
            :'user'
        }
        
    </div>
}

const mstp = (state) =>{
    return { user: state.currentUser}
}

export default compose(withRouter, connect(mstp,{setCurrentUser}))(UserPage)