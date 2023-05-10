import { FC, useEffect, useState } from 'react'

import reactLogo from '../../assets/img/reactLogo.svg'

import { menuItemsHandler } from './menu-items.data'

import {
  useAppSelector,
  useAppDispatch,
} from '../../types/typedDispatch&Selector.types'

import { getUserProfile } from '../../redux/slices/profile-slice/profileAsyncActions'
import { getPeoples } from '../../redux/slices/side-bar-slice/sideBarAsyncActions'

import { getIsAuth } from '../../redux/slices/auth-slice/authSelectors'
import { getFriends } from '../../redux/slices/side-bar-slice/sideBarSelectors'

import { Layout, Menu } from 'antd'
import FriendsFrame from './FriendsFrame/FriendsFrame'

import './SideBar.css'

type PropsType = {
  collapsed: boolean
}

const { Sider } = Layout

export const SideBar: FC<PropsType> = ({ collapsed }) => {
  const peoples = useAppSelector(getFriends)
  const isAuth = useAppSelector(getIsAuth)

  const dispatch = useAppDispatch()

  const defaultMenuItem = localStorage.getItem('selectedMenuItem')

  const [activeItem, setActiveItem] = useState(defaultMenuItem || '1')

  useEffect(() => {
    localStorage.setItem('selectedMenuItem', activeItem)
  }, [activeItem])

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
        defaultSelectedKeys={[`${activeItem}`]}
        items={menuItemsHandler(setActiveItem)}
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
}
