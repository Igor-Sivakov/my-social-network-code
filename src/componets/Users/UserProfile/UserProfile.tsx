import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import userAvatar from '../../../img/userAvatar.jpeg'
import { UserDataType } from '../../../Types/Types'
import './UserProfile.css'

type PropsType = {
  user: UserDataType
  followingInProgress: number[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const UserProfile: FC<PropsType> = memo(
  ({
    user: { id, photos, followed, name, status },
    followingInProgress,
    unfollow,
    follow,
  }) => {
    return (
      <section className='find-friends__profile__container'>
        <div className='find-friends__profile__inner'>
          <div className='find-friends__profile__img-name__wrapper'>
            <NavLink className='' to={'/Profile/' + id}>
              <img
                src={photos.small != null ? photos.small : userAvatar}
                className='find-friends__profile__img'
                alt='avatar'
              />
            </NavLink>
            <div>
              <NavLink className='' to={'/Profile/' + id}>
                <p className='find-friends__profile__name'>{name}</p>
              </NavLink>
              <p className='find-friends__profile__status'>
                {status != null
                  ? status
                  : 'Hi guys! Tomorrow I will be boarding, who is with me?'}
              </p>
            </div>
          </div>

          <div>
            {followed ? (
              <button
                disabled={followingInProgress.some((iD) => iD === id)}
                onClick={() => {
                  unfollow(id)
                }}
                className='find-friends__profile__add-btn btn _hover'
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.some((iD) => iD === id)}
                onClick={() => {
                  follow(id)
                }}
                className='find-friends__profile__add-btn btn _hover'
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </section>
    )
  }
)

export default UserProfile
