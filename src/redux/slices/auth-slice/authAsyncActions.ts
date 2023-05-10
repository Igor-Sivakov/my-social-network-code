import { createAsyncThunk } from "@reduxjs/toolkit"

import { getAuthProfilePhoto, getCaptchaUrlSuccess, hasError, setUserData } from "./authReducer"

import { profileAPI, ResultCodeEnum, ResultCodeForCaptcha } from "../../../API/profileAPI"
import { authAPI } from "../../../API/authAPI"
import { securityApi } from "../../../API/securityAPI"

import { ProfileType } from "../../../types/reducers.types"



export const getAuth = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    try {
      const authData = await authAPI.getAuth()
      const { id, email, login } = authData.data

      if (authData.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserData({ id, email, login, isAuth: true }))
      }
    } catch (error) {
      console.warn(error)
    }
  }
)

export const getProfilePhotoForHeader = createAsyncThunk<void, number>('auth/getAuth',
  async (userId, { dispatch }) => {
    try {
      const profilePhoto: ProfileType = await profileAPI.getUserProfile(userId)

      dispatch(getAuthProfilePhoto(profilePhoto.photos))
    } catch (error) {
      console.warn(error)
    }
  }
)

export const signIn = createAsyncThunk<void, object>('auth/getAuth',
  async (formData, { dispatch }) => {
    try {
      const loginData = await authAPI.signIn(formData)

      if (loginData.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        dispatch(getAuth())
      } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
          // if required captcha, get captcha url
          dispatch(getCaptchaUrl())
        }

        const message =
          loginData.messages.length > 0
            ? loginData.messages[0]
            : 'some error'

        dispatch(hasError(message))
      }
    } catch (error) {
      console.warn(error)
    }
  }
)

export const signOut = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    try {
      const logoutData = await authAPI.signOut()

      if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(setUserData({
          id: null, email: null, login: null, isAuth: false
        }))
      }
    } catch (error) {
      console.warn(error)
    }
  }
)

export const getCaptchaUrl = createAsyncThunk<void, void>('auth/getAuth',
  async (_, { dispatch }) => {
    try {
      const captchaUrl: string = await securityApi.getCaptchaUrl()

      dispatch(getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {
      console.warn(error)
    }
  }
)