import React, {useState} from 'react'
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { compose } from "redux";
import {addTraining} from '../usersReduser'

const UserProgram = (props) =>{
    let user = props.user
    let keyArr = props.match.url.split('/')
   let key = keyArr[keyArr.length-1]
   let userUrl = props.match.params.userId + '/'+ key
   let [title, setTitle] = useState('')
   let [body, setBody] = useState('')
    let [addMode, setAddMode] = useState(false)

    let addNewTraining = (e)=>{
        if(title.trim() && body.trim()){
            const training ={
                'title':title,
                'body':body,
                'data':new Date().toLocaleDateString()
            }
            e.preventDefault()
             user.program.unshift(training)
            props.addTraining(user.program, userUrl)
            setAddMode(false)
        }else{
            e.preventDefault()
            setBody('введите тренировку')
            setTitle('введите название')
        }
        
    }
    return <div onDoubleClick={()=>{setAddMode(false)}}>
         {addMode?
         <form  onSubmit = {(e)=>{ addNewTraining(e);}} className = 'records-form'>
         <input  type="text" value={title} onChange = {(e)=>{ setTitle(e.currentTarget.value)}} placeholder='введите название тренировки' className = 'form__title-input' />
         <textarea  value={body} placeholder='введите упражнения' className = 'form__body-input'  onChange = {(e)=>{setBody(e.currentTarget.value)}}/>
         <input type="submit" value = 'add training' className = 'records-form-button form__submit-input' />
     </form>: <button onClick = {()=>{setAddMode(true)}}>Add training</button>
     }
       {user[key]?props.user[key].map((workout, i) =>{
           return <div key = {i} className = 'training'>
              <p>{workout.title}</p> 
              <p>{workout.data}</p> 
              <div>{workout.body.split('\n').map((excersize, i)=>{
                 return <p key = {i}>{excersize}</p>
              })}</div> 
              <button onClick={ ()=>{
                  let trainingArr = user.program.filter(training => training.body !== workout.body)
                  props.addTraining(trainingArr, userUrl)
                  }}>delete training</button>
               </div>
       }): 'program'}
       
    </div>
}

const mstp = (state)=>{
    return {
        user:state.currentUser
    }
}


 export default compose(withRouter, connect(mstp,{addTraining}))(UserProgram)