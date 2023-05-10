import { Photos } from "./other.types"


/* sideBarReducer */

export type PeoplesDataType =
  {
    id: number
    name: string
    photos: Photos
    followed: boolean
  }

/* userReducer */

export type UserDataType = {
  id: number
  name: string
  photos: Photos
  country: string | null
  city: string | null
  status: string | null
  followed: boolean
}

export type UsersFilterType = {
  term: string
  friend: null | boolean
}

export type toggleFollowingProgressArgumentsType = {
  inProgress: boolean
  userId: number
}

/* profileReducer */

export type PostsDataType = {
  id: string
  name: string
  avatar: string | undefined
  message: string
  likeCounts: number
  comments:
  {
    commentId: string
    userName: string | null
    avatar: string | undefined
    comment: string
  }[]
}

export type ProfileType = {
  id: number
  fullName: string
  aboutMe: string
  lookingForAJobDescription: string
  photos: Photos
}

export type ProfileExtraStateType = {
  homePlace: string
  education: string
}

export type AddPostType = {
  postText: string
  fullName: string
  avatar: string | undefined
}

export type AddCommentType = {
  id: string
  avatar: string | undefined
  userName: string | null
  comment: string
}

export type CommentsType = {
  commentId: string
  avatar: string | undefined
  userName: string | null
  comment: string
}

/* dialogsReducer */

export type MessagesDataType = {
  id: string
  avatar: string | undefined
  name: string
  message: string
}