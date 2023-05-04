import { FC, memo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AddPostType } from '../../../../redux/reducers/profileReducer'
import { formValidatorPost } from '../../../utils/validators'
import { Photos } from '../../../../Types/Types'
import './PostForm.css'

export type PostFormValuesType = {
  post_form__text: string
}

type PropsType = {
  addPost: (post: AddPostType) => void
  fullName: string
  avatar: Photos
}

const PostFormComponent: FC<PropsType> = memo(
  ({ addPost, fullName, avatar }) => {
    const submit = (
      values: PostFormValuesType,
      {
        setSubmitting,
        resetForm,
      }: {
        resetForm: (values: object) => void
        setSubmitting: (isSubmitting: boolean) => void
      }
    ) => {
      const postText = values.post_form__text
      if (!values.post_form__text) return
      setTimeout(() => {
        const userAvatar = avatar.small
        addPost({ postText, fullName, avatar: userAvatar })
        resetForm({})
        setSubmitting(false)
      }, 400)
    }

    const Textarea = (props: any) => <textarea {...props} />

    return (
      <div>
        <Formik
          initialValues={{ post_form__text: '' }}
          validate={formValidatorPost}
          onSubmit={submit}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <Field
                name='post_form__text'
                type='text'
                as={Textarea}
                onChange={handleChange}
                placeholder='What`s on your mind, today?'
                className='post-form__textarea'
              />
              <ErrorMessage
                name='post_form__text'
                component='div'
                className='_error'
              />
              <button
                type='submit'
                disabled={isSubmitting}
                className='post-form__btn btn _hover'
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
)

export default PostFormComponent
