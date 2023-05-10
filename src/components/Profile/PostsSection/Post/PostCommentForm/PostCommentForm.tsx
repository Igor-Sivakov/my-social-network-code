import { FC, memo } from 'react'

import { formValidatorPostComment } from '../../../../utils/validators'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import './PostCommentForm.css'

type PropsType = {
  message: string
  submit: (
    values: EditPostAddCommentValuesType,
    { resetForm }: { resetForm: (values: object) => void }
  ) => void
  placeholder: string
}

export type EditPostAddCommentValuesType = {
  post_comment_form__text: string
}

const PostCommentForm: FC<PropsType> = memo(
  ({ message, submit, placeholder }) => {
    return (
      <>
        <Formik
          initialValues={{ post_comment_form__text: message }}
          validate={formValidatorPostComment}
          onSubmit={submit}
        >
          {({ isSubmitting, handleChange }) => (
            <Form className='edit-post-form__wrapper'>
              <Field
                type='text'
                name='post_comment_form__text'
                placeholder={placeholder}
                onChange={handleChange}
                className='edit-post-form__textarea'
              />

              <ErrorMessage
                name='post_comment_form__text'
                component='div'
                className='_error'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='edit-post-form__btn btn _hover'
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </>
    )
  }
)

export default PostCommentForm
