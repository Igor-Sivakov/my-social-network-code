import { Dispatch } from 'redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { chatAPI, ChatMessageType, MessagesReceivedSubscriberType, StatusChangedSubscriberType, StatusType } from "../../../API/chatAPI"

import { messagesReceived, statusChanged } from './chatReducer'



type NewMessageHandlerType = ((messages: ChatMessageType[]) => void) | null

type NewStatusHandlerType = ((status: StatusType) => void) | null


let _newMessageHandler: NewMessageHandlerType = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(messagesReceived(messages))
    }
  }

  return _newMessageHandler
}

let _newStatusHandler: NewStatusHandlerType = null

const newStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusHandler === null) {
    _newStatusHandler = (status) => {
      dispatch(statusChanged(status))
    }
  }

  return _newStatusHandler
}

export const startMessagesListening = createAsyncThunk<void, void>(
  'chat/startMessagesListening', async (_, { dispatch }) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscriberType)
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch) as
      StatusChangedSubscriberType)
  })

export const stopMessagesListening = createAsyncThunk<void, void>('chat/stopMessagesListening', async (_, { dispatch }) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscriberType)
  chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch) as
    StatusChangedSubscriberType)
  chatAPI.stop()
})

export const sendMessage = createAsyncThunk<void, string>('chat/sendMessage',
  async (message, { dispatch }) => {
    chatAPI.sendMessage(message)
  })