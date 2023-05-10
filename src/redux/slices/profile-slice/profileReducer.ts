import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v1 } from 'uuid'

import mainWallpaper from '../../../assets/img/mainWallpaper.jpeg'

import { initialPostsData, initialProfileData, initialProfileExtraStateData } from './initial.data'

import { StatusType } from "../../../components/Profile/ProfileInfo/ProfileStatus/ProfileStatus"
import { Photos } from '../../../types/other.types'
import { PostsDataType, ProfileType, ProfileExtraStateType, AddPostType, AddCommentType, CommentsType } from '../../../types/reducers.types'



export type InitStProfileReducerType = {
  postsData: PostsDataType[]
  profile: ProfileType
  profileExtraState: ProfileExtraStateType
  status: StatusType
  profileWallpaper: string | undefined
}


const initialState: InitStProfileReducerType = {
  postsData: initialPostsData,
  profile: initialProfileData,
  profileExtraState: initialProfileExtraStateData,
  status: '',
  profileWallpaper: mainWallpaper
}


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<AddPostType>) {
      let randomId = v1()
      let newPost = {
        id: randomId,
        name: action.payload.fullName,
        avatar: action.payload.avatar,
        message: action.payload.postText,
        likeCounts: 0,
        comments: []
      }

      return {
        ...state,
        postsData: [...state.postsData, newPost],
      }
    },
    setUserProfile(state, action: PayloadAction<ProfileType>) {
      state.profile = action.payload
    },
    setStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    },
    savePhotoSuccess(state, action: PayloadAction<Photos>) {
      state.profile.photos = action.payload
    },
    updateProfileExtraState(state, action: PayloadAction<ProfileExtraStateType>) {
      state.profileExtraState = action.payload
    },
    deletePost(state, action: PayloadAction<{ id: string }>) {
      state.postsData = state.postsData.filter((post) => post.id !== action.payload.id)
    },
    editPost(state, action: PayloadAction<{ id: string, editedPost: string }>) {
      state.postsData.filter((post) => post.id === action.payload.id && [...state.postsData, post.message = action.payload.editedPost])
    },
    addComment(state, action: PayloadAction<AddCommentType>) {
      let randomId = v1()
      let newComment = {
        commentId: randomId,
        avatar: action.payload.avatar,
        userName: action.payload.userName,
        comment: action.payload.comment
      }
      state.postsData.filter((post) => post.id === action.payload.id && [...state.postsData, post.comments.push(newComment)])
    },
    deleteComment(state, action: PayloadAction<{ id: string, commentId: string, comments: CommentsType[] }>) {
      const actualComments = action.payload.comments.filter((comment) => comment.commentId !== action.payload.commentId)
      state.postsData.filter((post) => post.id === action.payload.id && [...state.postsData, post.comments = actualComments])
    },
  }
})

export default profileSlice.reducer

export const {
  addPost, updateProfileExtraState, deletePost, editPost, addComment, deleteComment, setUserProfile, setStatus, savePhotoSuccess
} = profileSlice.actions
