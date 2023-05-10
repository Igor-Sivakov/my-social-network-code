import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { initialUsersData } from "./initial.data"

import { findObjInArray } from "../../../components/utils/helpers"

import { UserDataType, UsersFilterType, toggleFollowingProgressArgumentsType } from "../../../types/reducers.types"



export type InitStUsersReducerType = {
  usersData: UserDataType[]
  pageSize: number
  totalUsersCount: number
  setCurrentPage: number
  isFetching: boolean
  followingInProgress: number[]
  filter: UsersFilterType
}


const initialState: InitStUsersReducerType = {
  usersData: initialUsersData,
  pageSize: 5,
  totalUsersCount: 30,
  setCurrentPage: 1,
  isFetching: false,
  followingInProgress: [], // array users id for fetching disable-enable btn 
  filter: {
    term: '',
    friend: null
  }
}


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    follow(state, action: PayloadAction<number>) {
      state.usersData = findObjInArray(state.usersData, 'id', action.payload, {
        followed: true
      })
    },
    unfollow(state, action: PayloadAction<number>) {
      state.usersData = findObjInArray(state.usersData, 'id', action.payload, {
        followed: false
      })
    },
    setUsers(state, action: PayloadAction<UserDataType[]>) {
      state.usersData = []
      state.usersData.push(...action.payload)
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.setCurrentPage = action.payload
    },
    setTotalUsersCount(state, action: PayloadAction<number>) {
      state.totalUsersCount = action.payload
    },
    toggleIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
    toggleFollowingProgress(state, action: PayloadAction<toggleFollowingProgressArgumentsType>) {
      state.followingInProgress = action.payload.inProgress
        ? [...state.followingInProgress, action.payload.userId]
        : state.followingInProgress.filter((id) => id !== action.payload.userId)
    },
    setFilter(state, action: PayloadAction<UsersFilterType>) {
      state.filter = action.payload
    }
  }
})

export default usersSlice.reducer

export const { toggleIsFetching, setCurrentPage, setFilter, setTotalUsersCount, setUsers, toggleFollowingProgress, follow, unfollow } = usersSlice.actions

