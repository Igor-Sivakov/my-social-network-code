import { FC, memo } from 'react'

import { formValidatorMessage } from '../../utils/validators'

import { useAppSelector } from '../../../types/typedDispatch&Selector.types'

import { getAuthProfilePhoto } from '../../../redux/slices/auth-slice/authSelectors'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import './MessageForm.css'

export type MessageFormValuesType = {
  message_form__text: string
}

type PropsType = {
  sendNewMessageBody: ({
    message,
    avatar,
  }: {
    message: string
    avatar: string | undefined
  }) => void
}

const MessageForm: FC<PropsType> = memo(({ sendNewMessageBody }) => {
  const userAvatar = useAppSelector(getAuthProfilePhoto)

  const submit = (
    values: MessageFormValuesType,
    {
      setSubmitting,
      resetForm,
    }: {
      resetForm: (values: object) => void
      setSubmitting: (isSubmitting: boolean) => void
    }
  ) => {
    if (!values.message_form__text) return
    setTimeout(() => {
      const message = values.message_form__text
      const avatar = userAvatar.small

      sendNewMessageBody({ message, avatar })
      //backend don`t have API for sending messages, this message will be keeps only in redux
      resetForm({})
      setSubmitting(false)
    }, 400)
  }

  return (
    <Formik
      initialValues={{ message_form__text: '' }}
      validate={formValidatorMessage}
      onSubmit={submit}
    >
      {({ isSubmitting, resetForm, handleChange }) => (
        <Form className='dialogs-message-form__inner'>
          <Field
            type='text'
            name='message_form__text'
            placeholder='Enter your message...'
            onChange={handleChange}
            className='dialogs-message-form__textarea'
          />

          <ErrorMessage
            name='message_form__text'
            component='div'
            className='_error'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='dialogs-message-form__btn btn _hover'
          >
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
})

export default MessageForm
