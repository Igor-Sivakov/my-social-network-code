import { FC, memo, useState } from 'react'
import cn from 'clsx'

import { EllipsisOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../../../../types/typedDispatch&Selector.types'

import { deleteComment } from '../../../../../../redux/slices/profile-slice/profileReducer'

import { CommentsType } from '../../../../../../types/reducers.types'

import './Comment.css'

type PropsType = {
  comment: CommentsType
  comments: CommentsType[]
  id: string
}

const Comment: FC<PropsType> = memo(({ comment, comments, id }) => {
  const [isCommentDeleteBtn, setIsCommentDeleteBtn] = useState<boolean | null>(
    null
  )

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
          setIsCommentDeleteBtn(
            isCommentDeleteBtn === null ? true : !isCommentDeleteBtn
          )
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            setIsCommentDeleteBtn(false)
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
        className={cn('comment__delete-btn btn _hover', {
          ['_visible']: isCommentDeleteBtn,
          ['_hidden']: isCommentDeleteBtn === false,
        })}
        onClick={() => {
          const { commentId } = comment
          dispatch(deleteComment({ commentId, comments, id }))
        }}
      >
        delete
      </button>
    </div>
  )
})

export default Comment
