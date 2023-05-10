import { AppStateType } from "../../store"

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getAuthProfilePhoto = (state: AppStateType) => {
  return state.auth.profilePhoto
}

export const getAuthLogin = (state: AppStateType) => {
  return state.auth.login
}

export const getAuthId = (state: AppStateType) => {
  return state.auth.id
}

export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl
}

export const getError = (state: AppStateType) => {
  return state.auth.error
}
