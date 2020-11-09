import React, {useState} from 'react'
import { withRouter} from "react-router-dom";
import { addSize, setUserSize } from '../usersReduser';
import { compose } from 'redux';
import { connect } from 'react-redux';

const UserSizeForm = (props) =>{
    let keyArr = props.match.url.split('/')
   let key = keyArr[keyArr.length-1]
   let userUrl = props.match.params.userId + '/'+ key
    let [size, setSize] = useState(props.user.size)

    let changeSize = (e)=>{
        if(size){
            e.preventDefault()
            props.addSize(size, userUrl)
            props.setAddMode(false)
        }else{
            e.preventDefault()
        }
       
        
    }
    
    return <form onSubmit = {(e)=>{ changeSize(e) }}>
        {props.user.size && Object.entries(size).map(arr=>{
            let key = arr[0]
            return <label key={key}>{key} <input type="text" value={size[key]} onChange = {(e)=>{
               let sizeValue = e.currentTarget.value
                let newSize = {...size}
                newSize[key] = sizeValue
                setSize(newSize)
            }}/></label>
        })}
    <input type="submit" value = 'submit' className = 'form__submit-input' />
</form>
}

const mstp = (state)=>{return {user:state.currentUser}}

export default compose(withRouter, connect(mstp ,{addSize, setUserSize})) (UserSizeForm)