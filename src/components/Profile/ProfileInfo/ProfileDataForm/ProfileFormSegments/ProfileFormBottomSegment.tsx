import { FC } from 'react'

import { formValidatorProfBottomSegment } from '../../../../utils/validators'

import { ProfileExtraStateType } from '../../../../../types/reducers.types'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import '../ProfileDataForm.css'

type PropsType = {
  initialValues: ProfileExtraStateType
  setEditMod: (arg0: boolean) => void
  updateProfileExtraState: (extraState: ProfileExtraStateType) => void
}

const ProfileFormBottomSegment: FC<PropsType> = ({
  initialValues: { homePlace, education },
  setEditMod,
  updateProfileExtraState,
}) => {
  const submit = (
    values: ProfileExtraStateType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      updateProfileExtraState(values)
      setEditMod(false)
      setSubmitting(false)
    }, 400)
  }

  return (
    <div>
      <Formik
        initialValues={{ homePlace: homePlace, education: education }}
        validate={formValidatorProfBottomSegment}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor='homePlace'>
              My home place: <br />
              <Field
                name='homePlace'
                placeholder='Where do you live?'
                className='profile-info-form__top-segment__input'
              />
              <ErrorMessage
                name='homePlace'
                component='div'
                className='_error'
              />
            </label>

            <label htmlFor='education'>
              <br /> Where did I study: <br />
              <Field
                name='education'
                placeholder='Your alma mater...'
                className='profile-info-form__top-segment__input'
              />
              <ErrorMessage
                name='education'
                component='div'
                className='_error'
              />
            </label>

            <br />

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

export default ProfileFormBottomSegment
