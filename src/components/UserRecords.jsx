import React, {useState} from 'react'
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { compose } from "redux";
import {addRecord} from '../usersReduser'

const UserRecords = (props) =>{
    let records = props.user.records
    let keyArr = props.match.url.split('/')
   let key = keyArr[keyArr.length-1]
   let userUrl = props.match.params.userId + '/'+ key
   let [addMode, setAddMode] = useState(false)
   let [record, setRecord] = useState('')

   let addNewRecord = (e)=>{
       if(record.trim()){
        e.preventDefault()
        records.unshift(record)
        props.addRecord(records, userUrl)
        setAddMode(false)
       }else{
        e.preventDefault()
        setRecord('введите личный рекорд')
       }
   
}
    return <div onDoubleClick = {()=>{ setAddMode(false)}}>
        {addMode?
       <form  onSubmit = {(e)=>{ addNewRecord(e); }}  style ={{'display':'block'}} >  
       <input  type="text" value = {record} placeholder='введите рекорд' className = 'form__text-input' onChange={(e)=>{setRecord(e.target.value)}}/>
       <input type="submit" value = 'submit' className = 'form__submit-input'/>
   </form>:<button onClick = {()=>{setAddMode(true)}}>add record</button>}
   
      <ul>{props.user.name?records.map((record, i) =>{
           return <li key = {i}><p>{record} </p><button onClick={ ()=>{
            let recordsArr = records.filter(rec => record !== rec)
            props.addRecord(recordsArr, userUrl)
            }}>delete record</button>
             </li>
            
       }):'records'}</ul>   
    </div>
}

const mstp = (state)=>{
    return {
        user:state.currentUser
    }
}


 export default compose(withRouter, connect(mstp,{addRecord}))(UserRecords)