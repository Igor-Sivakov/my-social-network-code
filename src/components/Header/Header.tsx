import { createElement, FC, memo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import userInfoAvatar from '../../assets/img/userInfoAvatar.jpeg'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import {
  getProfilePhotoForHeader,
  signOut,
} from '../../redux/slices/auth-slice/authAsyncActions'

import {
  getAuthId,
  getAuthLogin,
  getAuthProfilePhoto,
  getIsAuth,
} from '../../redux/slices/auth-slice/authSelectors'

import { Avatar, Col, Layout, Row } from 'antd'

import './Header.css'

type PropsType = {
  collapsed: boolean
  colorBgContainer: string
  setCollapsed: (collapsed: boolean) => void
}

export const Header: FC<PropsType> = memo(
  ({ collapsed, colorBgContainer, setCollapsed }) => {
    const { Header } = Layout

    const isAuth = useAppSelector(getIsAuth)
    const authLogin = useAppSelector(getAuthLogin)
    const authId = useAppSelector(getAuthId)
    const profilePhoto = useAppSelector(getAuthProfilePhoto)

    const dispatch = useAppDispatch()

    const photos =
      profilePhoto.large != null
        ? profilePhoto.large
        : profilePhoto.small != null
        ? profilePhoto.small
        : userInfoAvatar

    const signOutD = () => {
      dispatch(signOut() as any)
    }

    const onClickSignOutSignIn = () => {
      if (isAuth) return signOutD()
      else return <NavLink to={'/Login'} />
    }

    useEffect(() => {
      if (isAuth) dispatch(getProfilePhotoForHeader(authId as number) as any)
    }, [dispatch, authId, isAuth])

    return (
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Row>
          <Col span={16}>
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Col>

          <Col span={8}>
            <div className='header__auth__container'>
              {isAuth ? (
                <NavLink
                  className='header__auth__user-profile-btn btn _hover'
                  to={'/Profile/' + authId}
                >
                  <Avatar size={35} style={{ marginRight: 5 }} src={photos} />

                  {authLogin}
                </NavLink>
              ) : null}

              <button
                className='header__auth__login-btn btn _hover'
                onClick={onClickSignOutSignIn}
              >
                {isAuth ? 'Sign out' : 'Sign in'}
              </button>
            </div>
          </Col>
        </Row>
      </Header>
    )
  }
)
