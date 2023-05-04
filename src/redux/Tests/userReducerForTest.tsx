import { Dispatch } from 'redux'
import userAvatar from '../../img/userAvatar.jpeg'
import userInfoAvatar from '../../img/userInfoAvatar.jpeg'
import {
  ResponseDataType,
  ResultCodeEnum,
} from '../../componets/API/profileAPI'
import { userAPI } from '../../componets/API/userAPI'
import {
  InferActionsType,
  ThunkType,
  UserDataType,
  UsersFilterType,
} from './../../Types/Types'
import { findObjInArray } from '../../componets/utils/findObjInArrayHelper'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'
const SET_FIlTER = 'users/SET_FIlTER'

export type InitStUsersReduserType = {
  usersData: UserDataType[]
  pageSize: number
  totalUsersCount: number
  setCurrentPage: number
  isFetching: boolean
  followingInProgress: number[]
  filter: UsersFilterType
}

export type ActionsType = InferActionsType<typeof actions>

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
      followed: false,
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
      followed: false,
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
      followed: true,
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
      followed: false,
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
      followed: true,
    },
  ],
  pageSize: 5,
  totalUsersCount: 30,
  setCurrentPage: 1,
  isFetching: false,
  followingInProgress: [], // array users id for fetching disable-enable btn
  filter: {
    term: '',
    friend: null,
  },
}

const usersReduser = (
  state: InitStUsersReduserType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: findObjInArray(state.usersData, 'id', action.userId, {
          followed: true,
        }),
      }

    case UNFOLLOW:
      return {
        ...state,
        usersData: findObjInArray(state.usersData, 'id', action.userId, {
          followed: false,
        }),
      }

    case SET_USERS: {
      return { ...state, usersData: action.users }
    }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        setCurrentPage: action.pageNumber,
      }

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.inProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      }

    case SET_FIlTER:
      return {
        ...state,
        filter: action.payload,
      }

    default:
      return state
  }
}

export const actions = {
  follow: (userId: number) => ({ type: FOLLOW, userId } as const),

  unfollow: (userId: number) => ({ type: UNFOLLOW, userId } as const),

  setUsers: (users: UserDataType[]) => ({ type: SET_USERS, users } as const),

  setCurrentPage: (pageNumber: number) =>
    ({ type: SET_CURRENT_PAGE, pageNumber } as const),

  setTotalUsersCount: (totalCount: number) =>
    ({ type: SET_TOTAL_USERS_COUNT, totalCount } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_IS_FETCHING, isFetching } as const),

  toggleFollowingProgress: (inProgress: boolean, userId: number) =>
    ({
      type: TOGGLE_FOLLOWING_PROGRESS,
      inProgress,
      userId,
    } as const),

  setFilter: (filter: UsersFilterType) =>
    ({
      type: SET_FIlTER,
      payload: filter,
    } as const),
}

export const requestUsers = (
  currentPage: number,
  pageSize: number,
  filter: UsersFilterType
): ThunkType<ActionsType> => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))

    let users = await userAPI.getUser(
      currentPage,
      pageSize,
      filter.term,
      filter.friend
    )

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(users.items))
    dispatch(actions.setTotalUsersCount(users.totalCount))
  }
}

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseDataType>,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let followUnfollowResponse = await apiMethod(userId)

  if (followUnfollowResponse.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const getFollow = (userId: number): ThunkType<ActionsType> => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userAPI),
      actions.follow
    )
  }
}

export const getUnfollow = (userId: number): ThunkType<ActionsType> => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unfollow.bind(userAPI),
      actions.unfollow
    )
  }
}

export default usersReduser
