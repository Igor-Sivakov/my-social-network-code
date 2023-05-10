import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppStateType, AppDispatch } from '../redux/store'


export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector:
  TypedUseSelectorHook<AppStateType> = useSelector