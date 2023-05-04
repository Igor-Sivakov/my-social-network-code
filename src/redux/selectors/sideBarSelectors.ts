import { AppStateType } from "../redux-store"

export const getFriends = (state: AppStateType) => {
  return state.sideBar.peoplesData
}
