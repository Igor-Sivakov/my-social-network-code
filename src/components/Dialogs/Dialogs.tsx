import { FC, memo, useEffect, useRef, useState } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import { sendNewMessageBody } from '../../redux/slices/dialogs-slice/dialogsReducer'
import { getFriendsForDialogs } from '../../redux/slices/dialogs-slice/dialogsAsyncActions'

import { getMessagesData } from '../../redux/slices/dialogs-slice/dialogsSelectors'

import { withAuthReNavigate } from '../HOC/withAuthReNavigate'

import { DialogElements, MessageElements } from './Message&DialogElements'
import MessageForm from './MessageForm/MessageForm'

import './Dialogs.css'

const Dialogs: FC = memo(() => {
  const messages = useAppSelector(getMessagesData)
  const messageAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAutoScroll) {
      const scrollToNewMessage = () =>
        messageAnchorRef.current?.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })

      setTimeout(scrollToNewMessage, 300)
    }
  }, [messages, isAutoScroll])

  useEffect(() => {
    dispatch(
      getFriendsForDialogs() as AsyncThunkAction<void, void, {}> & AnyAction
    )
  }, [dispatch])

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    /* prettier-ignore */
    Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight
    ) < 300
      ? !isAutoScroll && setIsAutoScroll(true)
      : isAutoScroll && setIsAutoScroll(false)
  }

  const sendNewMessageBodyD = ({
    message,
    avatar,
  }: {
    message: string
    avatar: string | undefined
  }) => {
    dispatch(sendNewMessageBody({ message, avatar }))
  }

  return (
    <main className='dialogs__container'>
      <h2 className='main-page__h2'>DIALOGS</h2>

      <div className='dialogs__wrapper'>
        <section className='dialogs-list__container'>
          <div className='dialogs-list__inner'>
            <ul>
              <DialogElements />
            </ul>
          </div>
        </section>

        <section className='dialogs-messages__container'>
          <div
            onScroll={onScrollHandler}
            className='dialogs-messages__chat-container'
          >
            <MessageElements />
            <div ref={messageAnchorRef}></div>
          </div>

          <MessageForm sendNewMessageBody={sendNewMessageBodyD} />
        </section>
      </div>
    </main>
  )
})

export default withAuthReNavigate(Dialogs)
