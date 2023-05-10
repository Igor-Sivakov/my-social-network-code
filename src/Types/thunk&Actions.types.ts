import { ThunkAction } from "redux-thunk"
import { Action } from 'redux'
import { AppStateType } from '../redux/store'


/* Actions type */

export type InferActionsType<T> = T extends {
  [key: string]:
  (...arg: any[]) => infer U
} ? U : never

/* Thunk type */

export type ThunkType<ActionsType extends Action> =
  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>