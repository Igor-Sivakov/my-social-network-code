import { FC, memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import { requestUsers } from '../../redux/slices/user-slice/userAsyncActions'

import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from '../../redux/slices/user-slice/usersSelectors'

import { UsersFilterType } from '../../types/reducers.types'

import { withAuthReNavigate } from '../HOC/withAuthReNavigate'

import Preloader from '../common/preloader/preloader'
import Users from './Users'

type QueryParamsType = {
  term?: string
  friend?: string
  page?: string
}

const UserPage: FC = memo(() => {
  const isFetching = useAppSelector(getIsFetching)
  const filter = useAppSelector(getUsersFilter)
  const pageSize = useAppSelector(getPageSize)
  const currentPage = useAppSelector(getCurrentPage)

  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const pageQuery = searchParams.get('page')
    const termQuery = searchParams.get('term') || ''
    const friendQuery = searchParams.get('friend')

    let actualPage = currentPage
    let actualFilter = filter

    if (!!pageQuery) actualPage = Number(pageQuery)

    if (!!termQuery)
      actualFilter = { ...actualFilter, term: termQuery as string }

    if (!!friendQuery)
      actualFilter = {
        ...actualFilter,
        friend:
          friendQuery === 'null' ? null : friendQuery === 'true' ? true : false,
      }

    dispatch(
      requestUsers({ actualPage, pageSize, actualFilter }) as AsyncThunkAction<
        void,
        { actualPage: number; pageSize: number; actualFilter: UsersFilterType },
        {}
      > &
        AnyAction
    )
  }, [dispatch, pageSize, searchParams])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    setSearchParams(query)
  }, [filter, currentPage, setSearchParams])

  if (isFetching) return <Preloader />

  return <Users currentPage={currentPage} pageSize={pageSize} filter={filter} />
})

export default withAuthReNavigate(UserPage)
