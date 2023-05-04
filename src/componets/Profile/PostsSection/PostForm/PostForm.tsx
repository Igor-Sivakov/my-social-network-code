import React, { FC } from 'react'
import { AddPostType } from '../../../../redux/reducers/profileReducer'
import { Photos } from '../../../../Types/Types'
import PostFormComponent from './PostFormComponent'
import './PostForm.css'

type PropsType = {
  addPost: (post: AddPostType) => void
  fullName: string
  avatar: Photos
}

const PostForm: FC<PropsType> = React.memo((props) => {
  return (
    <div className='post-form__container'>
      <div className='post-form__inner'>
        <div className='post-form__h3'>Add new post</div>
        <PostFormComponent
          avatar={props.avatar}
          fullName={props.fullName}
          addPost={props.addPost}
        />
      </div>
    </div>
  )
})

export default PostForm
