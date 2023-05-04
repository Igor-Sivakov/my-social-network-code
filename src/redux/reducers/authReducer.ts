import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { profileAPI, ResultCodeEnum, ResultCodeForCaptcha } from "../../componets/API/profileAPI"
import { authAPI } from "../../componets/API/authAPI"
import { securityApi } from "../../componets/API/securityAPI"

import { Photos, ProfileType } from "../../Types/Types"


type UserDataType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: true | false
}

export type InitStAuthReduserType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
  error: string | null
  profilePhoto: Photos
}

let initialState: InitStAuthReduserType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null, // if null, then captcha is not required
  error: null,
  profilePhoto: {
    large: undefined,
    small: undefined
  }
}

export const getAuth = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    let authData = await authAPI.getAuth()
    let { id, email, login } = authData.data
    if (authData.resultCode === ResultCodeEnum.Success) {
      dispatch(authSlice.actions.setUserData({ id, email, login, isAuth: true }))
    }
  }
)

export const getProfilePhotoForHeader = createAsyncThunk<void, number>('auth/getAuth',
  async (userId, { dispatch }) => {
    let profilePhoto: ProfileType = await profileAPI.getUserProfile(userId)
    dispatch(authSlice.actions.getAuthProfilePhoto(profilePhoto.photos))
  }
)

export const signIn = createAsyncThunk<void, object>('auth/getAuth',
  async (formData, { dispatch }) => {
    let loginData = await authAPI.signIn(formData)

    if (loginData.resultCode === ResultCodeEnum.Success) {
      // success, get auth data
      dispatch(getAuth())
    } else {
      if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsReuired) {
        // if required captcha, get captcha url
        dispatch(getCaptchaUrl())
      }

      let message =
        loginData.messages.length > 0
          ? loginData.messages[0]
          : 'some error'
      dispatch(authSlice.actions.hasError(message))
    }
  }
)

export const signOut = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    let logoutData = await authAPI.signOut()

    if (logoutData.resultCode === ResultCodeEnum.Success) {
      dispatch(authSlice.actions.setUserData({
        id: null, email: null, login: null, isAuth: false
      }))
    }
  }
)

export const getCaptchaUrl = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    let captchaUrl: string = await securityApi.getCaptchaUrl()
    dispatch(authSlice.actions.getCaptchaUrlSuccess(captchaUrl))
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDataType>) {
      const { id, email, login, isAuth } = action.payload
      state.id = id
      state.email = email
      state.login = login
      state.isAuth = isAuth
    },

    getAuthProfilePhoto(state, action: PayloadAction<Photos>) {
      state.profilePhoto = action.payload
    },

    getCaptchaUrlSuccess(state, action: PayloadAction<string>) {
      state.captchaUrl = action.payload
    },
    hasError(state, action: PayloadAction<string>) {
      state.error = action.payload
    }
  }
})


export default authSlice.reducer

