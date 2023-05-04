import { FC, memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import { requestUsers } from '../../redux/reducers/usersReduser'
import {
  getcurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from '../../redux/selectors/usersSelectors'
import { withAuthReNavigate } from '../HOC/withAuthReNavigate'
import {
  useAppDispatch,
  useAppSelector,
  UsersFilterType,
} from '../../Types/Types'
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
  const currentPage = useAppSelector(getcurrentPage)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
