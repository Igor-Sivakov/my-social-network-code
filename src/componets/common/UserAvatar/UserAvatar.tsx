import { FC } from 'react'
import userAvatar from '../../../img/userAvatar.jpeg'
import './UserAvatar.css'

type PropsType = {
  avatar: string | undefined
}

const UserAvatar: FC<PropsType> = ({ avatar }) => {
  return (
    <div>
      <img
        src={avatar != null || undefined ? avatar : userAvatar}
        className='user-item__avatar'
        alt='user-avatar'
      />
    </div>
  )
}

export default UserAvatar
