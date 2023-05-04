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
  getUserProfile,
  getUserStatus,
} from '../../redux/reducers/profileReducer'
import { getAuthId } from '../../redux/selectors/authSelectors'
import { withAuthReNavigate } from '../HOC/withAuthReNavigate'
import { useAppDispatch, useAppSelector } from '../../Types/Types'
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

    return (
      <>
        <Profile authUserId={authUserId} userId={userId} />
      </>
    )
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
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return (
      <WrappedComponent {...props} router={{ location, navigate, params }} />
    )
  }

  return ComponentWithRouterProp
}

export default withRouter(withAuthReNavigate(ProfilePage))
