import { FC } from 'react'

import { formValidatorProfTopSegment } from '../../../../utils/validators'

import { ProfileType } from '../../../../../types/reducers.types'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import '../ProfileDataForm.css'

type PropsType = {
  initialValues: ProfileType
  setEditMod: (arg0: boolean) => void
  saveProfileUpdate: (profile: PFTopSegmentType) => void
}

export type PFTopSegmentType = {
  fullName: string
  aboutMe: string
  lookingForAJobDescription: string
}

const ProfileFormTopSegment: FC<PropsType> = ({
  initialValues: { fullName, aboutMe, lookingForAJobDescription },
  setEditMod,
  saveProfileUpdate,
}) => {
  const submit = (
    values: PFTopSegmentType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      saveProfileUpdate(values)
      setEditMod(false)
      setSubmitting(false)
    }, 400)
  }

  return (
    <div className='profile-info-form__top-segment__inner'>
      <Formik
        initialValues={{
          fullName: fullName,
          aboutMe: aboutMe,
          lookingForAJobDescription: lookingForAJobDescription,
        }}
        validate={formValidatorProfTopSegment}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor='fullName'>
              Full name: <br />
              <Field
                name='fullName'
                placeholder='Please,enter your name...'
                className='profile-info-form__top-segment__input'
              />
              <ErrorMessage
                name='fullName'
                component='div'
                className='_error'
              />
            </label>

            <label htmlFor='aboutMe'>
              <br /> About me: <br />
              <Field
                name='aboutMe'
                placeholder='A few words about yourself...'
                className='profile-info-form__top-segment__input _wdth'
              />
              <ErrorMessage name='aboutMe' component='div' className='_error' />
            </label>

            <label htmlFor='lookingForAJobDescription'>
              My professional skills: <br />
              <Field
                name='lookingForAJobDescription'
                placeholder='Your professional skills...'
                className='profile-info-form__top-segment__input _wdth'
              />
              <ErrorMessage
                name='lookingForAJobDescription'
                component='div'
                className='_error'
              />
            </label>

            <button
              type='submit'
              disabled={isSubmitting}
              className='profile-info-form__top-segment__btn btn _hover'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileFormTopSegment
