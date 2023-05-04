import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authSlice from './reducers/authReducer'
import dialogsSlice from './reducers/dialogsReducer'
import profileSlice from './reducers/profileReducer'
import sideBarSlice from './reducers/sideBarReducer'
import usersSlice from './reducers/usersReduser'
import chatSlice from './reducers/chatReduser'
import appSlice from './reducers/appReducer'


export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const rootReducer = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsSlice,
  sideBar: sideBarSlice,
  usersPage: usersSlice,
  auth: authSlice,
  app: appSlice,
  chat: chatSlice,
})


const store = configureStore({
  reducer: rootReducer
})

export default store






