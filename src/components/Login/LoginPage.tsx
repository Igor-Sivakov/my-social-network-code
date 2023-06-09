import { FC, memo, useEffect } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import { Navigate } from 'react-router-dom'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import { signIn } from '../../redux/slices/auth-slice/authAsyncActions'

import {
  getCaptchaUrl,
  getError,
  getIsAuth,
} from '../../redux/slices/auth-slice/authSelectors'

import LoginForm, { LoginFormType } from './LoginForm'

import './Login.css'

const LoginPage: FC = memo(() => {
  const authInfo = useAppSelector(getIsAuth)
  const captchaUrl = useAppSelector(getCaptchaUrl)
  const errorInfo = useAppSelector(getError)

  const dispatch = useAppDispatch()

  const signInD = (formData: LoginFormType) => {
    dispatch(signIn(formData) as AsyncThunkAction<void, object, {}> & AnyAction)
  }

  useEffect(() => {}, [authInfo])

  if (authInfo) return <Navigate to={'/Profile'} />

  return (
    <div>
      <h1>LOG IN</h1>

      <div className='login-form__wrapper'>
        <LoginForm
          captchaUrl={captchaUrl}
          errorInfo={errorInfo}
          signIn={signInD}
        />
      </div>
    </div>
  )
})

export default LoginPage
