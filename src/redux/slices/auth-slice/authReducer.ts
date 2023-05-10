import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Photos } from "../../../types/other.types"


type UserDataType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: true | false
}

export type InitStAuthReducerType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
  error: string | null
  profilePhoto: Photos
}

const initialState: InitStAuthReducerType = {
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

export const { setUserData, getAuthProfilePhoto, getCaptchaUrlSuccess, hasError } = authSlice.actions

