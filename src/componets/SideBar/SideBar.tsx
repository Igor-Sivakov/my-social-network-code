import { FC, memo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  IeCircleFilled,
  MailFilled,
  IdcardFilled,
  EyeFilled,
  SettingFilled,
  CustomerServiceFilled,
  WechatOutlined,
} from '@ant-design/icons'
import reactLogo from './../../img/reactLogo.svg'
import { getUserProfile } from '../../redux/reducers/profileReducer'
import { getPeoples } from '../../redux/reducers/sideBarReducer'
import { getIsAuth } from '../../redux/selectors/authSelectors'
import { getFriends } from '../../redux/selectors/sideBarSelectors'
import { useAppDispatch, useAppSelector } from '../../Types/Types'
import FriendsFrame from './FriendsFrame/FriendsFrame'
import './SideBar.css'

const { Sider } = Layout

type PropsType = {
  collapsed: boolean
}

export const SideBar: FC<PropsType> = memo(({ collapsed }) => {
  const peoples = useAppSelector(getFriends)
  const isAuth = useAppSelector(getIsAuth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPeoples())
  }, [dispatch])

  const getUserProfileD = (userId: number) => {
    dispatch(getUserProfile(userId))
  }

  return (
    <Sider trigger={null} theme='light' collapsible collapsed={collapsed}>
      <div className={collapsed ? 'sideBar__logo_collapsed' : 'sideBar__logo'}>
        <img src={reactLogo} alt='reactLogo' />
        <div>React</div>
      </div>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: (
              <NavLink to='/Profile'>
                <IdcardFilled />
              </NavLink>
            ),
            label: 'Profile',
            className: 'side-bar__item__link',
          },
          {
            key: '2',
            icon: (
              <NavLink to='/Dialogs'>
                <MailFilled />
              </NavLink>
            ),
            label: 'Messages',
            className: 'side-bar__item__link',
          },
          {
            key: '3',
            icon: (
              <NavLink to='/Chat'>
                <WechatOutlined />
              </NavLink>
            ),
            label: 'Chat',
            className: 'side-bar__item__link',
          },
          {
            key: '4',
            icon: (
              <NavLink to='/News'>
                <IeCircleFilled />
              </NavLink>
            ),
            label: 'News',
            className: 'side-bar__item__link',
          },
          {
            key: '5',
            icon: (
              <NavLink to='/Music'>
                <CustomerServiceFilled />
              </NavLink>
            ),
            label: 'Music',
            className: 'side-bar__item__link',
          },
          {
            key: '6',
            icon: (
              <NavLink to='/Users'>
                <EyeFilled />
              </NavLink>
            ),
            label: 'Find friends',
            className: 'side-bar__item__link',
          },
          {
            key: '7',
            icon: (
              <NavLink to='/Settings'>
                <SettingFilled />
              </NavLink>
            ),
            label: 'Settings',
            className: 'side-bar__item__link',
          },
        ]}
      />
      {collapsed ? null : (
        <FriendsFrame
          peoples={peoples}
          isAuth={isAuth}
          getUserProfile={getUserProfileD}
        />
      )}
    </Sider>
  )
})
