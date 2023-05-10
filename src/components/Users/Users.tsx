import { FC, memo } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import {
  getFollow,
  getUnfollow,
  requestUsers,
} from '../../redux/slices/user-slice/userAsyncActions'

import {
  getFollowingInProgress,
  getTotalUsersCount,
  getUsers,
} from '../../redux/slices/user-slice/usersSelectors'

import { UsersFilterType, UserDataType } from '../../types/reducers.types'

import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import UserProfile from './UserProfile/UserProfile'
import Pagination from '../common/Pagination/Pagination'

import './Users.css'

type PropsType = {
  currentPage: number
  pageSize: number
  filter: UsersFilterType
}

const Users: FC<PropsType> = memo(({ currentPage, pageSize, filter }) => {
  const users = useAppSelector(getUsers)
  const totalUsersCount = useAppSelector(getTotalUsersCount)
  const followingInProgress = useAppSelector(getFollowingInProgress)

  const dispatch = useAppDispatch()

  const onPageChanged = (pageNumber: number) => {
    dispatch(
      requestUsers({
        actualPage: pageNumber,
        pageSize,
        actualFilter: filter,
      }) as AsyncThunkAction<
        void,
        { actualPage: number; pageSize: number; actualFilter: UsersFilterType },
        {}
      > &
        AnyAction
    )
  }

  const onFilterChanged = (filter: UsersFilterType) => {
    dispatch(
      requestUsers({
        actualPage: 1,
        pageSize,
        actualFilter: filter,
      }) as AsyncThunkAction<
        void,
        { actualPage: number; pageSize: number; actualFilter: UsersFilterType },
        {}
      > &
        AnyAction
    )
  }

  const follow = (userId: number) => {
    dispatch(
      getFollow(userId) as AsyncThunkAction<void, number, {}> & AnyAction
    )
  }

  const unfollow = (userId: number) => {
    dispatch(
      getUnfollow(userId) as AsyncThunkAction<void, number, {}> & AnyAction
    )
  }

  const userProfileElement = users.map((profile: UserDataType) => (
    <UserProfile
      user={profile}
      key={profile.id}
      follow={follow}
      unfollow={unfollow}
      followingInProgress={followingInProgress}
    />
  ))

  return (
    <main className='find-friends__container'>
      <h2 className='main-page__h2'>USERS</h2>

      <div className='find-friends__wrapper'>
        <section className='find-friends__inner'>
          <UsersSearchForm onFilterChanged={onFilterChanged} />

          <div className='find-friends__item__inner'>{userProfileElement}</div>

          <button
            className='find-friends__next-page-btn btn _hover'
            onClick={(e) => {
              onPageChanged(currentPage + 1)
            }}
          >
            Show more
          </button>

          <Pagination
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        </section>
      </div>
    </main>
  )
})

export default Users
