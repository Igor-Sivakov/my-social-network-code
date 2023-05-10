import { AnyAction, Dispatch } from "redux"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { follow, setCurrentPage, setFilter, setTotalUsersCount, setUsers, toggleFollowingProgress, toggleIsFetching, unfollow } from "./usersReducer"

import { ResponseDataType, ResultCodeEnum } from "../../../API/profileAPI"
import { userAPI } from "../../../API/userAPI"

import { UsersFilterType } from "../../../types/reducers.types"




export const requestUsers = createAsyncThunk<void, { actualPage: number, pageSize: number, actualFilter: UsersFilterType }>('users/requestUsers',
  async ({ actualPage, pageSize, actualFilter }, { dispatch }) => {
    try {
      dispatch(toggleIsFetching(true))
      dispatch(setCurrentPage(actualPage))
      dispatch(setFilter(actualFilter))

      const users = await userAPI.getUser(actualPage, pageSize,
        actualFilter.term, actualFilter.friend)

      dispatch(toggleIsFetching(false))
      dispatch(setUsers(users.items))
      dispatch(setTotalUsersCount(users.totalCount))
    } catch (error) {
      console.warn(error)
    }
  })

const _followUnfollowFlow = async (
  dispatch: Dispatch<AnyAction>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseDataType>,
  actionCreator: (userId: number) => AnyAction
) => {
  try {
    dispatch(toggleFollowingProgress({ inProgress: true, userId }))
    const followUnfollowResponse = await apiMethod(userId)

    if (followUnfollowResponse.resultCode === ResultCodeEnum.Success) {
      dispatch(actionCreator(userId))
    }

    dispatch(toggleFollowingProgress({ inProgress: false, userId }))
  } catch (error) {
    console.warn(error)
  }
}

export const getFollow = createAsyncThunk<void, number>('users/getFollow',
  async (userId, { dispatch }) => {
    await _followUnfollowFlow(dispatch, userId,
      userAPI.follow.bind(userAPI), follow
    )
  })

export const getUnfollow = createAsyncThunk<void, number>('users/getUnfollow',
  async (userId, { dispatch }) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unfollow.bind(userAPI),
      unfollow
    )
  })