import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import authSlice from './slices/auth-slice/authReducer'
import dialogsSlice from './slices/dialogs-slice/dialogsReducer'
import profileSlice from './slices/profile-slice/profileReducer'
import sideBarSlice from './slices/side-bar-slice/sideBarReducer'
import usersSlice from './slices/user-slice/usersReducer'
import chatSlice from './slices/chat-slice/chatReducer'
import appSlice from './slices/app-slice/appReducer'


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






