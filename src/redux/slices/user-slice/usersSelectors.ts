import { AppStateType } from "../../store"

export const getUsers = (state: AppStateType) => {
  return state.usersPage.usersData
}

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.setCurrentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter
}

