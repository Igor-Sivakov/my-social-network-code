import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { HeartFilled } from '@ant-design/icons'

import './LikesComponent.css'

type PropsType = {
  likeCounts: number
}

export const LikesComponent: FC<PropsType> = memo(({ likeCounts }) => {
  return (
    <div className='post__likes__wrapper'>
      {likeCounts === 0 ? (
        <div className='post__likes__container'>
          <div className='post__splitter-line' />
          <HeartFilled className='post__likes__icon' />

          <span className='post__likes__text'>While there are no likes</span>
        </div>
      ) : (
        <div className='post__likes__container'>
          <div className='post__splitter-line' />
          <HeartFilled className='post__likes__icon' />

          <span className='post__likes__text'>
            Liked by{' '}
            <NavLink to={'#'} className='post__likes__whosLikes'>
              John Doe
            </NavLink>{' '}
            &{' '}
            <NavLink to={'#'} className='post__likes__whosLikes'>
              {likeCounts} others
            </NavLink>
          </span>
        </div>
      )}
    </div>
  )
})
