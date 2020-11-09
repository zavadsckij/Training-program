import {createStore, applyMiddleware} from "redux"
import usersReducer from './usersReduser'
import thunkMiddleware from 'redux-thunk'




let store = createStore(usersReducer, applyMiddleware(thunkMiddleware))
window.store = store

export default store;