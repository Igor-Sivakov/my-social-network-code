import { createElement, FC, memo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Col, Layout, Row } from 'antd'
import userInfoAvatar from '../../img/userInfoAvatar.jpeg'
import {
  getProfilePhotoForHeader,
  signOut,
} from '../../redux/reducers/authReducer'
import {
  getAuthId,
  getAuthLogin,
  getAuthProfilePhoto,
  getIsAuth,
} from '../../redux/selectors/authSelectors'
import { useAppDispatch, useAppSelector } from '../../Types/Types'
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

    let onClickSignOutSignIn = () => {
      if (isAuth) return signOutD()
      else return <NavLink to={'/Login'}></NavLink>
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
