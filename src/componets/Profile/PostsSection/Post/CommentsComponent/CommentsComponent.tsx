import { FC, memo, useState } from 'react'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import {
  addComment,
  CommentsType,
} from '../../../../../redux/reducers/profileReducer'
import {
  getAuthLogin,
  getAuthProfilePhoto,
} from '../../../../../redux/selectors/authSelectors'
import { useAppDispatch, useAppSelector } from '../../../../../Types/Types'
import PostCommentForm, {
  EditPostAddCommentValuesType,
} from '../PostCommentForm/PostCommentForm'
import Comment from './Comment/Comment'
import './CommentsComponent.css'

type PropsType = {
  comments: CommentsType[]
  id: string
}

export const CommentsComponent: FC<PropsType> = memo(({ comments, id }) => {
  const userPhoto = useAppSelector(getAuthProfilePhoto)
  const userName = useAppSelector(getAuthLogin)

  const dispatch = useAppDispatch()

  const [isCommentsShow, setIsCommentsShow] = useState(false)

  const addCommentSubmit = (
    values: EditPostAddCommentValuesType,
    { resetForm }: { resetForm: (values: object) => void }
  ) => {
    if (!values.post_comment_form__text) return
    const comment = values.post_comment_form__text
    dispatch(
      addComment({
        comment,
        id,
        avatar: userPhoto.large,
        userName: userName,
      })
    )
    resetForm({})
    setIsCommentsShow(true)
  }

  const comment = comments.map((comment) => {
    return (
      <div key={comment.commentId}>
        <Comment comment={comment} comments={comments} id={id} />
      </div>
    )
  })

  return (
    <div className='post__comments__container'>
      <div className='post__comments__splitter-line'></div>
      <div className='post__comments__inner'>
        <span>Comments</span>
        <div
          className='post__comments__toggler'
          onClick={() => {
            setIsCommentsShow(!isCommentsShow)
          }}
        >
          {isCommentsShow ? <CaretUpFilled /> : <CaretDownFilled />}
        </div>
      </div>
      {isCommentsShow && <div className='post__comments'>{comment}</div>}
      <div style={{ marginTop: '10px' }}>
        <PostCommentForm
          message={''}
          placeholder={'Write a comment...'}
          submit={addCommentSubmit}
        />
      </div>
    </div>
  )
})
