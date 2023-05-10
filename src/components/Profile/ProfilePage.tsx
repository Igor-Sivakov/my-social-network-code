import { ComponentType, FC, memo, useEffect } from 'react'
import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import {
  getUserProfile,
  getUserStatus,
} from '../../redux/slices/profile-slice/profileAsyncActions'

import { getAuthId } from '../../redux/slices/auth-slice/authSelectors'

import { withAuthReNavigate } from '../HOC/withAuthReNavigate'

import Profile from './Profile'

type PropsType = {
  router: {
    params: {
      userId: number | null
    }
  }
}

const ProfilePage: FC<PropsType> = memo(
  ({
    router: {
      params: { userId },
    },
  }) => {
    const authUserId = useAppSelector(getAuthId)

    const dispatch = useAppDispatch()

    useEffect(() => {
      let userID = userId
      if (!userID) {
        userID = authUserId
      }
      dispatch(
        getUserProfile(userID) as AsyncThunkAction<void, number | null, {}> &
          AnyAction
      )
      dispatch(
        getUserStatus(userID) as AsyncThunkAction<void, number | null, {}> &
          AnyAction
      )
    }, [dispatch, userId, authUserId])

    return <Profile authUserId={authUserId} userId={userId} />
  }
)

export type WithRouterPropsType = {
  router: {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params<string>>
  }
}

function withRouter<WCP>(WrappedComponent: ComponentType<WCP>) {
  const ComponentWithRouterProp: FC<WithRouterPropsType & WCP> = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    return (
      <WrappedComponent {...props} router={{ location, navigate, params }} />
    )
  }

  return ComponentWithRouterProp
}

export default withRouter(withAuthReNavigate(ProfilePage))
