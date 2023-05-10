import { FC, memo } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import { formValidatorChat } from '../../../utils/validators'

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../types/typedDispatch&Selector.types'

import { sendMessage } from '../../../../redux/slices/chat-slice/chatAsyncActions'

import { getStatus } from '../../../../redux/slices/chat-slice/chatSelectors'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import './ChatMessageForm.css'

export type ChatMessageFormValuesType = {
  chat_message_form__text: string
}

export const ChatMessageForm: FC = memo(() => {
  const status = useAppSelector(getStatus)

  const dispatch = useAppDispatch()

  const sendMessageHandler = (
    values: ChatMessageFormValuesType,
    {
      resetForm,
      setSubmitting,
    }: {
      resetForm: (values: object) => void
      setSubmitting: (isSubmitting: boolean) => void
    }
  ) => {
    if (!values.chat_message_form__text) return
    setTimeout(() => {
      dispatch(
        sendMessage(values.chat_message_form__text) as AsyncThunkAction<
          void,
          string,
          {}
        > &
          AnyAction
      )
      resetForm({})
      setSubmitting(false)
    }, 400)
  }

  return (
    <Formik
      initialValues={{ chat_message_form__text: '' }}
      validate={formValidatorChat}
      onSubmit={sendMessageHandler}
    >
      {({ resetForm, isSubmitting, handleChange }) => (
        <Form className='chat_message_form__inner'>
          <Field
            name='chat_message_form__text'
            type='text'
            onChange={handleChange}
            placeholder='Enter your message...'
            className='chat-message-form__textarea'
          />

          <ErrorMessage
            name='chat_message_form__text'
            component='div'
            className='_error'
          />

          <button
            type='submit'
            disabled={status !== 'ready' || isSubmitting}
            className='chat-message-form__btn btn _hover'
          >
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
})
