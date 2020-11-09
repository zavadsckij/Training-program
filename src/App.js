import React, {useEffect} from 'react'
import {
  BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import firebase from 'firebase'
import Users from './components/Users.jsx';
import UserPage from './components/UserPage';
import UserProgram from './components/UserProgram';
import UserRecords from './components/UserRecords';
import UserSize from './components/UserSize';
import Home from './components/Home';
import { connect } from 'react-redux';
import { getUsers, setFetching, getUsersFromAPI, setInit } from './usersReduser';
import loader from './img/loader.gif'
import Header from './components/Header';

const firebaseConfig = {
  config:"some config"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)






function App({isInit, users, isFetching, getUsersFromAPI, setInit, admin}) {
useEffect(()=>{
    getUsersFromAPI()
},[])
  return ( 
  < BrowserRouter >
    < div className = "app" >
      <Header setInit = {setInit} isInit = {isInit} admin={admin}/>
      {isFetching? <img src={loader} alt="" className = 'loader'/> : 
      <Switch>
      <Route exact path='/users' render = {()=>isInit? <Users users = {users} isFetching = {isFetching}/>:<Redirect to='/'/>}/>
      <Route exact path='/' render = {()=> <Home />}/>
      <Route exact path={`/users/:userId`} render = {()=> isInit? <UserPage />:<Redirect to='/'/>}/>
      <Route exact path={`/users/:userId/program`} render = {()=> isInit? <UserProgram />:<Redirect to='/'/>}/>
      <Route exact path={`/users/:userId/records`} render = {()=> isInit? <UserRecords />:<Redirect to='/'/>}/>
      <Route exact path={`/users/:userId/size`} render = {()=> isInit? <UserSize />:<Redirect to='/'/>}/>
    </Switch>
      }
     
        
      </div> 
    </BrowserRouter>

  );
}

const mstp = (state) =>{
  return {isInit: state.isInit, users:state.users, isFetching:state.isFetching, admin:state.admin}
}

export default connect(mstp,  {getUsers, setFetching, getUsersFromAPI, setInit})(App);

