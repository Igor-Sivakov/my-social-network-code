import { FC, memo, useEffect, useRef, useState } from 'react'
import { getChatMessages } from '../../../../redux/selectors/chatSelectors'
import { useAppSelector } from '../../../../Types/Types'
import { ChatMessage } from './ChatMessage/ChatMessage'
import './ChatMessages.css'

export const ChatMessages: FC = memo(() => {
  const messages = useAppSelector(getChatMessages)
  const messageAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    /* prettier-ignore */
    Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight
    ) < 300
      ? !isAutoScroll && setIsAutoScroll(true)
      : isAutoScroll && setIsAutoScroll(false)
  }

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

  return (
    <div className='chat-messages-screen__container' onScroll={onScrollHandler}>
      {messages.map((m, index) => (
        <ChatMessage message={m} key={index} />
      ))}
      <div ref={messageAnchorRef}></div>
    </div>
  )
})
