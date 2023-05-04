import { v1 } from 'uuid'
import { Dispatch } from 'redux'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { chatAPI, ChatMessageAPIType, ChatMessageType, MessagesReceivedSubscriberType, StatusChangedSubscriberType, StatusType } from "../../componets/API/chatAPI"


export type InitStChatReduserType = {
  messages: ChatMessageType[]
  status: StatusType
}

let initialState = {
  messages: [],
  status: 'pending' as StatusType
}

type NewMessageHandlerType = ((messages: ChatMessageType[]) => void) | null

type NewStatusHandlerType = ((status: StatusType) => void) | null


let _newMessageHandler: NewMessageHandlerType = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatSlice.actions.messagesRecevied(messages))
    }
  }
  return _newMessageHandler
}

let _newStatusHandler: NewStatusHandlerType = null

const newStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusHandler === null) {
    _newStatusHandler = (status) => {
      dispatch(chatSlice.actions.statusChanged(status))
    }
  }
  return _newStatusHandler
}

export const startMesssagesListening = createAsyncThunk<void, void>(
  'chat/startMesssagesListening', async (_, { dispatch }) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscriberType)
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch) as
      StatusChangedSubscriberType)
  })

export const stopMesssagesListening = createAsyncThunk<void, void>('chat/stopMesssagesListening', async (_, { dispatch }) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscriberType)
  chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch) as
    StatusChangedSubscriberType)
  chatAPI.stop()
})

export const sendMessage = createAsyncThunk<void, string>('chat/sendMessage',
  async (message, { dispatch }) => {
    chatAPI.sendMessage(message)
  })

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesRecevied(state: InitStChatReduserType, action: PayloadAction<ChatMessageAPIType[]>) {
      state.messages = [...state.messages, ...action.payload.map(m => ({
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


