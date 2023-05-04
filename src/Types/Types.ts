import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from "redux-thunk"
import { Action } from 'redux'
import { AppStateType, AppDispatch } from './../redux/redux-store'

/* Hooks */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


/* Components of types & other */

export type Photos = {
  large?: string | undefined
  small?: string | undefined
}

export type OwnPropsType = {}

/* Actions type */

export type InferActionsType<T> = T extends {
  [key: string]:
  (...arg: any[]) => infer U
} ? U : never

/* Thunk type */

export type ThunkType<ActionsType extends Action> =
  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

/* sideBarReduser */

export type PeoplesDataType =
  {
    id: number
    name: string
    photos: Photos
    followed: boolean
  }

/* userReduser */

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

/* profileReduser */

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

/* dialogsReduser */

export type MessagesDataType = {
  id: string
  avatar: string | undefined
  name: string
  message: string
}