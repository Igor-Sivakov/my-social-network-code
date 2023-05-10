import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import userAvatar from '../../../assets/img/userAvatar.jpeg'

import { PeoplesDataType } from '../../../types/reducers.types'

import './DialogListItem.scss'

type PropsType = {
  state: PeoplesDataType
}

const DialogListItem: FC<PropsType> = memo(({ state: { name, photos } }) => {
  return (
    <li className='dialogs-list__item__container'>
      <div className='dialogs-list__item__box-for-dot'>
        <div className='dialogs-list__item__dot' />

        <NavLink to={'/Dialogs'} className='dialogs-list__item__inner'>
          <img
            src={photos.small ? photos.small : userAvatar}
            className='dialogs-list__item__avatar'
            alt='avatar'
          />

          <p className='dialogs-list__item__name'>{name}</p>
        </NavLink>
      </div>
    </li>
  )
})

export default DialogListItem
