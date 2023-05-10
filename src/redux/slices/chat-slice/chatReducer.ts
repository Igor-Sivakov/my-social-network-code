import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { ChatMessageAPIType, ChatMessageType, StatusType } from "../../../API/chatAPI"



export type InitStChatReducerType = {
  messages: ChatMessageType[]
  status: StatusType
}

const initialState = {
  messages: [],
  status: 'pending' as StatusType
}


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesReceived(state: InitStChatReducerType, action: PayloadAction<ChatMessageAPIType[]>) {
      state.messages = [...action.payload.map(m => ({
        ...m,
        id: v1()
      })).filter((_, index, array) => index >= array.length - 90)]
    },
    statusChanged(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    }
  }
})

export default chatSlice.reducer

export const { messagesReceived, statusChanged } = chatSlice.actions


