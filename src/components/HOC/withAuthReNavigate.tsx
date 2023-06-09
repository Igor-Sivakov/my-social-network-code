import { ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { getIsAuth } from '../../redux/slices/auth-slice/authSelectors'

import { AppStateType } from '../../redux/store'

type StatePropsType = {
  isAuth: boolean
}

type DispatchPropsType = {}

type PropsType = StatePropsType & DispatchPropsType

let mapDispatchToPropsForReNavigate = (state: AppStateType): StatePropsType => {
  return {
    isAuth: getIsAuth(state),
  }
}

type IntrinsicAttributes = {}

export function withAuthReNavigate<WCP extends IntrinsicAttributes>(
  WrappedComponent: ComponentType<WCP>
) {
  const ReNavigateComponent: FC<PropsType> = (props) => {
    let { isAuth, ...restProps } = props
    if (!isAuth) return <Navigate to={'/Login'} />

    return <WrappedComponent {...(restProps as WCP)} />
  }

  return connect<StatePropsType, DispatchPropsType, WCP, AppStateType>(
    mapDispatchToPropsForReNavigate
  )(ReNavigateComponent)
}
