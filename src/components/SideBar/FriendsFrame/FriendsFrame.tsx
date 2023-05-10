import { FC, memo } from 'react'

import { PeoplesDataType } from '../../../types/reducers.types'

import FriendItem from './FriendItem/FriendItem'

import './FriendsFrame.css'

type PropsType = {
  peoples: PeoplesDataType[]
  isAuth: boolean
  getUserProfile: (userId: number) => void
}

const FriendsFrame: FC<PropsType> = memo(
  ({ peoples, isAuth, getUserProfile }) => {
    const sideBarElements = peoples.map((people: PeoplesDataType) => {
      if (people.name.length < 16 && isAuth) {
        return (
          <FriendItem
            state={people}
            key={people.id}
            getUserProfile={getUserProfile}
          />
        )
      } else {
        return null
      }
    })

    if (isAuth) {
      return (
        <section className='fiends-frame__container'>
          <h2 className='fiends-frame__h2'>
            <span>Friends</span>
            <br /> and followers
          </h2>

          <div className='fiends-frame__inner'>{sideBarElements}</div>
        </section>
      )
    } else {
      return null
    }
  }
)
export default FriendsFrame
