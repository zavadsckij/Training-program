import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { setInit, setAdmin } from './../usersReduser';
import { firebaseApp } from './../App';




const Home = ({isInit, setInit, setAdmin}) =>{
    let [password, setPassword] = useState('')
    let [email, setEmail] = useState('')


  const signUp =(e)=>{
        e.preventDefault()

      if(password.trim() && email.trim()){
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            alert('registration is successful')
            setInit(true)
            setAdmin(response.user.email)
        })
        .catch((error) => {
  
            const errorMessage = error.message;
            alert(errorMessage)
          });
      }else{
        setPassword('write password')
        setEmail('write email')
      }
    } 
    const signIn = (e) =>{
        e.preventDefault()

        if(password.trim() && email.trim()){
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((response)=>{
              console.log(response)
                setInit(true)
                setAdmin(response.user.email)
            })
            .catch((error) => {
      
                const errorMessage = error.message;
                alert(errorMessage)
              });
          }else{
            setPassword('write password')
            setEmail('write email')
          }
    } 
    
    return <div  className = 'login'>
        {isInit? <Redirect to='/users'/>:
        <div>
            <h1>Enter password</h1>
            <form className='home-form'>
            <input type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
            <input type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
            <input type="button" value="Sign In"  onClick={(e)=>{signIn(e)}}/>
            <input type="button" value="Registration"  onClick={(e)=>{signUp(e)}}/>
            </form>
        </div>}
    </div>
}

const mstp = (state)=>{
    return {
        isInit:state.isInit
    }
}

export default connect(mstp, {setInit, setAdmin})(Home) 