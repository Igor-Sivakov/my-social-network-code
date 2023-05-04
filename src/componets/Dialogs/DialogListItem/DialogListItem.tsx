import { NavLink } from 'react-router-dom'
import './DialogListItem.scss'
import userAvatar from './../../../img/userAvatar.jpeg'
import { FC, memo } from 'react'
import { PeoplesDataType } from '../../../Types/Types'

type PropsType = {
  state: PeoplesDataType
}

const DialogListItem: FC<PropsType> = memo(({ state: { name, photos } }) => {
  return (
    <li className='dialogs-list__item__container'>
      <div className='dialogs-list__item__box-for-dot'>
        <div className='dialogs-list__item__dot'></div>
        <NavLink to={'/Dialogs'} className='dialogs-list__item__inner'>
          <img
            src={photos.small ? photos.small : userAvatar}
            className='dialogs-list__item__avatar'
            alt='avatar'
          ></img>
          <p className='dialogs-list__item__name'>{name}</p>
        </NavLink>
      </div>
    </li>
  )
})

export default DialogListItem
