import { FC, memo } from 'react'

import { MessagesDataType } from '../../../types/reducers.types'

import UserItem from '../../common/UserAvatar/UserAvatar'

import './Messages.css'

type PropsType = {
  state: MessagesDataType
}

const Messages: FC<PropsType> = memo(({ state: { message, avatar } }) => {
  return (
    <div className='dialogs-message__item__conatiner'>
      <UserItem avatar={avatar} />

      <div className='dialogs-message__item__text__inner'>
        <p className='dialogs-message__item__text'>{message}</p>
      </div>
    </div>
  )
})

export default Messages
