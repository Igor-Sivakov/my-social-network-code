import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { initialDialogsData, initialMessagesData } from './initial.data'

import { PeoplesDataType, MessagesDataType } from '../../../types/reducers.types'



export type InitStDialogsReducerType = {
  dialogsData: PeoplesDataType[]
  messagesData: MessagesDataType[]
}

type AddNewMessage = {
  message: string
  avatar: string | undefined
}

let initialState: InitStDialogsReducerType = {
  dialogsData: initialDialogsData,
  messagesData: initialMessagesData,
}


const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    sendNewMessageBody(state, action: PayloadAction<AddNewMessage>) {
      //backend don`t have API for sending messages, this message will be keeps only in redux

      let messageBody = {
        id: v1(),
        avatar: action.payload.avatar,
        name: 'user',
        message: action.payload.message,
      }

      return {
        ...state,
        messagesData: [...state.messagesData, messageBody],
      }
    },
    addFriendsForDialogs(state, action: PayloadAction<PeoplesDataType[]>) {
      state.dialogsData = []
      state.dialogsData.push(...action.payload)
    }
  }
})

export default dialogsSlice.reducer

export const { sendNewMessageBody, addFriendsForDialogs } = dialogsSlice.actions

