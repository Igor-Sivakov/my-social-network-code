import { FC, memo } from 'react'
import { Formik, Form, Field } from 'formik'
import { getUsersFilter } from '../../../redux/selectors/usersSelectors'
import { useAppSelector, UsersFilterType } from '../../../Types/Types'
import './UsersSearchForm.css'

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type FormType = {
  term: string
  friend: 'true' | 'false' | 'null'
}

type PropsType = {
  onFilterChanged: (filter: UsersFilterType) => void
}

const UsersSearchForm: FC<PropsType> = memo((props) => {
  const filterS = useAppSelector(getUsersFilter)

  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: UsersFilterType = {
      term: values.term,
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'true'
          ? true
          : false,
    }
    setTimeout(() => {
      props.onFilterChanged(filter)
      setSubmitting(false)
    }, 400)
  }

  return (
    <section className='find-friends__search-form__container'>
      <Formik
        enableReinitialize
        initialValues={
          { term: filterS.term, friend: String(filterS.friend) } as FormType
        }
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              className='find-friends__search-form__text-input'
              type='text'
              placeholder='find users by name...'
              name='term'
            />
            <Field
              className='find-friends__search-form__select'
              name='friend'
              as='select'
            >
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <button
              className='find-friends__search-form__btn btn _hover'
              type='submit'
              disabled={isSubmitting}
            >
              Find
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
})

export default UsersSearchForm
