import { FC, memo } from 'react'

import { ChatMessageType } from '../../../../../API/chatAPI'

import UserAvatar from '../../../../common/UserAvatar/UserAvatar'

import './ChatMessage.css'

export const ChatMessage: FC<{ message: ChatMessageType }> = memo(
  ({ message: { photo, userName, message } }) => {
    return (
      <div className='chat-message__container'>
        <UserAvatar avatar={photo} />

        <div className='chat-message__message__inner'>
          <div className='chat-message__user-name'>{userName}</div>
          <div className='chat-message__message-text'>{message}</div>
        </div>
      </div>
    )
  }
)
