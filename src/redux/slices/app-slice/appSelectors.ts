import { AppStateType } from "../../store"

export const getInitialized = (state: AppStateType) => {
  return state.app.initialized
}

export const getGlobalError = (state: AppStateType) => {
  return state.app.globalError
}
