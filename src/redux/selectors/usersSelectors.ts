//import { createSelector } from 'reselect';

import { AppStateType } from "../redux-store"

export const getUsers = (state: AppStateType) => {
  return state.usersPage.usersData
}

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getcurrentPage = (state: AppStateType) => {
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

// example hard selector created by reselect
/* export const getUsersSuperSelector = createSelector(
  getUsers,
  getIsFetching,
  (users, isFetching) => {
    return users.filter((u) => true);
  }
);
 */
