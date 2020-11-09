

import React from 'react'

const UserSizeInfo = (props) =>{
    
    
    return <>
        <div>
            {props.user.size && Object.entries(props.user.size).map(value=>{
               return <p key={value[0]}><b>{value[0]}</b> <span>{value[1]}</span></p>
            })}
        </div>
        <button onClick = {()=>{props.setAddMode(true)}}>add size</button>
    </>
}

export default UserSizeInfo