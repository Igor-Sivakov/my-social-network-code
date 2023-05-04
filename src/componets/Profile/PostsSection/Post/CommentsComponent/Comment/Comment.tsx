import { FC, memo, useState } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import {
  CommentsType,
  deleteComment,
} from '../../../../../../redux/reducers/profileReducer'
import { useAppDispatch } from '../../../../../../Types/Types'
import './Comment.css'

type PropsType = {
  comment: CommentsType
  comments: CommentsType[]
  id: string
}

const Comment: FC<PropsType> = memo(({ comment, comments, id }) => {
  const [isCommentDelete, setIsCommentDelete] = useState(false)

  const dispatch = useAppDispatch()

  return (
    <div className='comment__container _visible'>
      <div className='comment__user-avatar'>
        <img src={comment.avatar} alt='comment_user-avatar' />
      </div>
      <div
        className='comment__inner'
        tabIndex={1}
        onClick={() => {
          setIsCommentDelete(true)
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            setIsCommentDelete(false)
          }
        }}
      >
        <div>
          <p className='comment__user-name'>{comment.userName}</p>
          <p className='comment__comment-text'>{comment.comment}</p>
        </div>
        <div className='comment__edit__icon'>
          <EllipsisOutlined className='comment__edit__icon' />
        </div>
      </div>

      <button
        className={
          isCommentDelete
            ? 'comment__delete-btn btn _hover _visible'
            : 'comment__delete-btn btn _hover _hidden'
        }
        onClick={() => {
          const commentId = comment.commentId
          dispatch(deleteComment({ commentId, comments, id }))
        }}
      >
        delete
      </button>
    </div>
  )
})

export default Comment
