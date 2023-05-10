import { AppStateType } from "../../store"

export const getFriends = (state: AppStateType) => {
  return state.sideBar.peoplesData
}
