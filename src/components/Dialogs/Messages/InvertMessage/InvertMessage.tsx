import { FC, memo } from 'react'

import { MessagesDataType } from '../../../../types/reducers.types'

import UserItem from '../../../common/UserAvatar/UserAvatar'

import './InvertMessage.css'

type PropsType = {
  state: MessagesDataType
}

const InvertMessage: FC<PropsType> = memo(({ state: { message, avatar } }) => {
  return (
    <div className='dialogs-invert-message__item__lean-to-the-left-board-box'>
      <div className='dialogs-invert-message__item__container'>
        <div className='dialogs-invert-message__item__text__inner'>
          <p className='dialogs-invert-message__item__text'>{message}</p>
        </div>

        <UserItem avatar={avatar} />
      </div>
    </div>
  )
})

export default InvertMessage
