import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import userAvatar from './../../../../img/userAvatar.jpeg'
import { PeoplesDataType } from '../../../../Types/Types'
import './FriendItem.scss'

type PropsType = {
  state: PeoplesDataType
  getUserProfile: (userId: number) => void
}

const FriendItem: FC<PropsType> = memo(
  ({ getUserProfile, state: { id, photos, name } }) => {
    return (
      <NavLink
        to={'/Profile/' + id}
        className='friend-item__conteiner'
        onClick={() => {
          getUserProfile(id)
        }}
      >
        <img
          src={photos.small ? photos.small : userAvatar}
          className='friend-item__avatar'
          alt='avatar'
        />
        <p className='friend-item__name'>{name}</p>{' '}
      </NavLink>
    )
  }
)

export default FriendItem
