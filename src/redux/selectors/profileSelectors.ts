import { AppStateType } from "../redux-store"

export const getPostsData = (state: AppStateType) => {
  return state.profilePage.postsData
}

export const getProfilePhotos = (state: AppStateType) => {
  return state.profilePage.profile.photos

}

export const getProfileFullName = (state: AppStateType) => {
  return state.profilePage.profile.fullName
}

export const getProfileAboutMe = (state: AppStateType) => {
  return state.profilePage.profile.aboutMe
}

export const getProfileLookingForAJob = (state: AppStateType) => {
  return state.profilePage.profile.lookingForAJobDescription
}

export const getProfileStatus = (state: AppStateType) => {
  return state.profilePage.status
}

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}

export const getProfileExtra = (state: AppStateType) => {
  return state.profilePage.profileExtraState
}

export const getWallpaper = (state: AppStateType) => {
  return state.profilePage.profileWallpaper
}