import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { LoginOutlined } from '@ant-design/icons'

import { formValidatorAuth } from '../utils/validators'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import './Login.css'

export type LoginFormType = {
  email: string
  password: string
  captcha: string | null
  rememberMe: boolean
}

type PropsType = {
  captchaUrl: string | null
  signIn: (formData: LoginFormType) => void
  errorInfo: string | null
}

const LoginForm: FC<PropsType> = memo(({ signIn, captchaUrl, errorInfo }) => {
  const submit = (
    values: LoginFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      signIn(values)
      setSubmitting(false)
    }, 400)
  }

  return (
    <div>
      <LoginOutlined className='login-form__logo' />
      <h2 className='login-form__h2'>Log in to your account</h2>
      <p className='login-form__greeting'>
        Welcome back! Please enter your details.
      </p>

      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
          captcha: null,
        }}
        validate={formValidatorAuth}
        onSubmit={submit}
      >
        {({ isSubmitting, handleChange }) => (
          <Form>
            <div className='login-form__input-container'>
              <label htmlFor='email' className='login-form__input-label'>
                Email
              </label>
              <Field
                type='email'
                name='email'
                onChange={handleChange}
                placeholder='Enter your email'
                className='login-form__input'
              />

              <ErrorMessage name='email' component='div' className='_error' />
            </div>

            <div className='login-form__input-container'>
              <label htmlFor='password' className='login-form__input-label'>
                Password
              </label>
              <Field
                type='password'
                name='password'
                onChange={handleChange}
                placeholder='Enter your password'
                className='login-form__input'
                autoComplete='off'
              />

              <ErrorMessage
                name='password'
                component='div'
                className='_error'
              />
            </div>

            <div className='login-form__captcha__container'>
              {captchaUrl && <img src={captchaUrl} alt='captcha' />}
              {captchaUrl && (
                <Field
                  name='captcha'
                  onChange={handleChange}
                  placeholder='Enter symbols from image...'
                  component='input'
                  className='login-form__input'
                />
              )}
            </div>

            {errorInfo && <div className='_error'>{errorInfo}</div>}

            <div className='login-form__checkbox__container'>
              <Field
                type='checkbox'
                name='rememberMe'
                component='input'
                className='login-form__checkbox'
              />

              <span>&ensp;remember for 30 days</span>
              <NavLink className='login-form__link' to={'#'}>
                Forgot password
              </NavLink>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='login-form__btn btn _hover'
            >
              Submit
            </button>

            <div className='login-form__sign-up__link__container'>
              Don't have an account?&ensp;
              <NavLink to={'#'} className='login-form__link'>
                Sign up
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
})

export default LoginForm
