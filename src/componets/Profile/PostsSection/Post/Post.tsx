import { FC, memo, useState } from 'react'
import { editPost } from '../../../../redux/reducers/profileReducer'
import { PostsDataType, useAppDispatch } from '../../../../Types/Types'
import PostCommentForm, {
  EditPostAddCommentValuesType,
} from './PostCommentForm/PostCommentForm'
import { SettingsMenu } from './SettingsMenu/SettingsMenu'
import { LikesComponent } from './LikesComponent/LikesComponent'
import { CommentsComponent } from './CommentsComponent/CommentsComponent'
import UserItem from '../../../common/UserAvatar/UserAvatar'
import './Post.css'

type PropsType = {
  state: PostsDataType
}

const Post: FC<PropsType> = memo(
  ({ state: { avatar, message, likeCounts, name, id, comments } }) => {
    const [showEditForm, setShowEditForm] = useState(false)

    const dispatch = useAppDispatch()

    const editPostSubmit = (
      values: EditPostAddCommentValuesType,
      { resetForm }: { resetForm: (values: object) => void }
    ) => {
      if (!values.post_comment_form__text) return
      const editedPost = values.post_comment_form__text
      dispatch(editPost({ id, editedPost }))
      setShowEditForm(false)
    }

    return (
      <div className='post__container'>
        <div className='post__user'>
          <UserItem avatar={avatar} />
          <div className='post__user-name'>{name}</div>
        </div>
        <div className='post__inner'>
          <div className='post__text'>
            <span>{message}</span>
          </div>
          <SettingsMenu id={id} setShowEditForm={setShowEditForm} />
        </div>
        <LikesComponent likeCounts={likeCounts} />
        <div className='post__edit-form__container'>
          {showEditForm && (
            <PostCommentForm
              message={message}
              placeholder={'Write a post...'}
              submit={editPostSubmit}
            />
          )}
        </div>
        <CommentsComponent comments={comments} id={id} />
      </div>
    )
  }
)

export default Post
