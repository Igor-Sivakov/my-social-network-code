import { FC, memo, useEffect, useRef, useState } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import {
  getFriendsForDialogs,
  sendNewMessageBody,
} from '../../redux/reducers/dialogsReducer'
import { getMessagesData } from '../../redux/selectors/dialogsSelectors'
import { withAuthReNavigate } from '../HOC/withAuthReNavigate'
import { useAppDispatch, useAppSelector } from '../../Types/Types'
import { DialogElements, MessageElemets } from './Message&DialogElements'
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
        <section className='dialogs-list__conteiner'>
          <div className='dialogs-list__inner'>
            <ul>
              <DialogElements />
            </ul>
          </div>
        </section>
        <section className='dialogs-messages__conteiner'>
          <div
            onScroll={onScrollHandler}
            className='dialogs-messages__chat-conteiner'
          >
            <MessageElemets />
            <div ref={messageAnchorRef}></div>
          </div>
          <MessageForm sendNewMessageBody={sendNewMessageBodyD} />
        </section>
      </div>
    </main>
  )
})

export default withAuthReNavigate(Dialogs)
