import { FC, useEffect } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import {
  useAppDispatch,
  useAppSelector,
} from '../../types/typedDispatch&Selector.types'

import {
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/slices/chat-slice/chatAsyncActions'

import { getStatus } from '../../redux/slices/chat-slice/chatSelectors'

import { ChatMessageForm } from './Messages&Form/ChatMessageForm/ChatMessageForm'
import { ChatMessages } from './Messages&Form/ChatMessages/ChatMessages'

import './ChatPage.css'
import { withAuthReNavigate } from '../HOC/withAuthReNavigate'

const ChatPage: FC = () => {
  const status = useAppSelector(getStatus)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      startMessagesListening() as AsyncThunkAction<void, void, {}> & AnyAction
    )

    return () => {
      dispatch(
        stopMessagesListening() as AsyncThunkAction<void, void, {}> & AnyAction
      )
    }
  }, [])

  return (
    <main className='chat__container'>
      <h2 className='main-page__h2'>CHAT</h2>

      {status === 'error' && (
        <div>Some error occured. Please refresh the page.</div>
      )}

      <div className='chat__inner'>
        <ChatMessages />
        <ChatMessageForm />
      </div>
    </main>
  )
}

export default withAuthReNavigate(ChatPage)
