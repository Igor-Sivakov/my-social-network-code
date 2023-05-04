import { FC, memo, useEffect } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import {
  startMesssagesListening,
  stopMesssagesListening,
} from '../../redux/reducers/chatReduser'
import { getStatus } from '../../redux/selectors/chatSelectors'
import { ChatMessageForm } from './Messages&Form/ChatMessageForm/ChatMessageForm'
import { ChatMessages } from './Messages&Form/ChatMessages/ChatMessages'
import { useAppDispatch, useAppSelector } from '../../Types/Types'
import './ChatPage.css'

const ChatPage: FC = memo(() => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)

  useEffect(() => {
    dispatch(
      startMesssagesListening() as AsyncThunkAction<void, void, {}> & AnyAction
    )
    return () => {
      dispatch(
        stopMesssagesListening() as AsyncThunkAction<void, void, {}> & AnyAction
      )
    }
  }, []) // eslint-disable-line

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
})

export default ChatPage
