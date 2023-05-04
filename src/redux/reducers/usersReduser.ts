import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AnyAction, Dispatch } from "redux"
import userAvatar from '../../img/userAvatar.jpeg'
import userInfoAvatar from '../../img/userInfoAvatar.jpeg'
import { ResponseDataType, ResultCodeEnum } from "../../componets/API/profileAPI"
import { userAPI } from "../../componets/API/userAPI"
import { UserDataType, UsersFilterType } from "../../Types/Types"
import { findObjInArray } from "../../componets/utils/findObjInArrayHelper"


export type InitStUsersReduserType = {
  usersData: UserDataType[]
  pageSize: number
  totalUsersCount: number
  setCurrentPage: number
  isFetching: boolean
  followingInProgress: number[]
  filter: UsersFilterType
}

type toggleFollowingProgressArgumentsType = {
  inProgress: boolean
  userId: number
}

let initialState: InitStUsersReduserType = {
  usersData: [
    {
      name: 'Leo Largo',
      photos: {
        large: userAvatar,
        small: userInfoAvatar,
      },
      id: 1,
      country: 'USA',
      city: 'New York',
      status: 'Hi guys! Tomorrow I will be boarding, who is with me?',
      followed: false
    },
    {
      name: 'Finch',
      photos: {
        large: userAvatar,
        small: userInfoAvatar,
      },
      id: 2,
      country: 'USA',
      city: 'Chicago',
      status: 'I am wery funny...',
      followed: false
    },
    {
      name: 'Tata',
      photos: {
        large: userAvatar,
        small: userInfoAvatar,
      },
      id: 3,
      country: 'United Kingdom',
      city: 'London',
      status: 'Like boarding...',
      followed: true
    },
    {
      name: 'Vanessa Leais',
      photos: {
        large: userAvatar,
        small: userInfoAvatar,
      },
      id: 4,
      country: 'Spain',
      city: 'Barselona',
      status: 'Beautiful & sexy.',
      followed: false
    },
    {
      name: 'Sasha Lenovskiy',
      photos: {
        large: userAvatar,
        small: userInfoAvatar,
      },
      id: 5,
      country: 'Ukrain',
      city: 'Kiev',
      status: 'Yanki go home!!!',
      followed: true
    },
  ],
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


export const requestUsers = createAsyncThunk<void, { actualPage: number, pageSize: number, actualFilter: UsersFilterType }>('users/requestUsers',
  async ({ actualPage, pageSize, actualFilter }, { dispatch }) => {
    dispatch(usersSlice.actions.toggleIsFetching(true))
    dispatch(usersSlice.actions.setCurrentPage(actualPage))
    dispatch(usersSlice.actions.setFilter(actualFilter))

    let users = await userAPI.getUser(actualPage, pageSize,
      actualFilter.term, actualFilter.friend)

    dispatch(usersSlice.actions.toggleIsFetching(false))
    dispatch(usersSlice.actions.setUsers(users.items))
    dispatch(usersSlice.actions.setTotalUsersCount(users.totalCount))
  })

const _followUnfollowFlow = async (
  dispatch: Dispatch<AnyAction>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseDataType>,
  actionCreator: (userId: number) => AnyAction
) => {
  dispatch(usersSlice.actions.toggleFollowingProgress({ inProgress: true, userId }))
  let followUnfollowResponse = await apiMethod(userId)

  if (followUnfollowResponse.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(usersSlice.actions.toggleFollowingProgress({ inProgress: false, userId }))
}

export const getFollow = createAsyncThunk<void, number>('users/getFollow',
  async (userId, { dispatch }) => {
    await _followUnfollowFlow(dispatch, userId,
      userAPI.follow.bind(userAPI), usersSlice.actions.follow
    )
  })

export const getUnfollow = createAsyncThunk<void, number>('users/getUnfollow',
  async (userId, { dispatch }) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unfollow.bind(userAPI),
      usersSlice.actions.unfollow
    )
  })


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

