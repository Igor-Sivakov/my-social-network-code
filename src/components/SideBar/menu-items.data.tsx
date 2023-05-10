import { NavLink } from 'react-router-dom'
import {
  IeCircleFilled,
  MailFilled,
  IdcardFilled,
  EyeFilled,
  SettingFilled,
  CustomerServiceFilled,
  WechatOutlined,
} from '@ant-design/icons'

export const menuItemsHandler = (setActive: (value: string) => void) => {
  return [
    {
      key: '1',
      icon: (
        <NavLink onClick={() => setActive('1')} to='/Profile'>
          <IdcardFilled />
        </NavLink>
      ),
      label: 'Profile',
      className: 'side-bar__item__link',
    },
    {
      key: '2',
      icon: (
        <NavLink onClick={() => setActive('2')} to='/Dialogs'>
          <MailFilled />
        </NavLink>
      ),
      label: 'Messages',
      className: 'side-bar__item__link',
    },
    {
      key: '3',
      icon: (
        <NavLink onClick={() => setActive('3')} to='/Chat'>
          <WechatOutlined />
        </NavLink>
      ),
      label: 'Chat',
      className: 'side-bar__item__link',
    },
    {
      key: '4',
      icon: (
        <NavLink onClick={() => setActive('4')} to='/News'>
          <IeCircleFilled />
        </NavLink>
      ),
      label: 'News',
      className: 'side-bar__item__link',
    },
    {
      key: '5',
      icon: (
        <NavLink onClick={() => setActive('5')} to='/Music'>
          <CustomerServiceFilled />
        </NavLink>
      ),
      label: 'Music',
      className: 'side-bar__item__link',
    },
    {
      key: '6',
      icon: (
        <NavLink onClick={() => setActive('6')} to='/Users'>
          <EyeFilled />
        </NavLink>
      ),
      label: 'Find friends',
      className: 'side-bar__item__link',
    },
    {
      key: '7',
      icon: (
        <NavLink onClick={() => setActive('7')} to='/Settings'>
          <SettingFilled />
        </NavLink>
      ),
      label: 'Settings',
      className: 'side-bar__item__link',
    },
  ]
}
