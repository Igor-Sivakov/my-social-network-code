import { FC, memo, useState } from 'react'
import cn from 'clsx'

import { EllipsisOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../../../types/typedDispatch&Selector.types'

import { deletePost } from '../../../../../redux/slices/profile-slice/profileReducer'

import './SettingsMenu.css'

type PropsType = {
  id: string
  setShowEditForm: (value: boolean) => void
}

export const SettingsMenu: FC<PropsType> = memo(({ id, setShowEditForm }) => {
  const [isPostMenuOpen, setIsPostMenuOpen] = useState<boolean | null>(null)

  const dispatch = useAppDispatch()

  return (
    <div className='post__settings__wrapper'>
      <div
        className='post__settings__toggler'
        tabIndex={1}
        onClick={() => {
          setIsPostMenuOpen(isPostMenuOpen === null ? true : !isPostMenuOpen)
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            setIsPostMenuOpen(false)
          }
        }}
      >
        <EllipsisOutlined />
      </div>

      <div
        className={cn('post__settings__menu', {
          ['_visible']: isPostMenuOpen,
          ['_hidden']: isPostMenuOpen === false,
        })}
      >
        <button
          className='post__settings__menu__btn btn _hover'
          onClick={() => {
            dispatch(deletePost({ id }))
          }}
        >
          <div
            style={{ background: '#f04438' }}
            className='post__settings__menu__btn__dot'
          />
          Delete
        </button>

        <button
          className='post__settings__menu__btn btn _hover'
          onClick={() => {
            setShowEditForm(true)
          }}
        >
          <div className='post__settings__menu__btn__dot' />
          <span style={{ marginRight: '15px' }}>Edit</span>
        </button>
      </div>
    </div>
  )
})
