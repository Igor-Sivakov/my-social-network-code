import { FC, memo, useState } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { deletePost } from '../../../../../redux/reducers/profileReducer'
import { useAppDispatch } from '../../../../../Types/Types'
import './SettingsMenu.css'

type PropsType = {
  id: string
  setShowEditForm: (value: boolean) => void
}

export const SettingsMenu: FC<PropsType> = memo(({ id, setShowEditForm }) => {
  const [isPostMenu, setIsPostMenu] = useState(false)

  const dispatch = useAppDispatch()

  return (
    <div
      className='post__settings__container'
      onClick={() => {
        setIsPostMenu(!isPostMenu)
      }}
    >
      <div className='post__settings__toggler'>
        <EllipsisOutlined />
      </div>
      <div
        className={
          isPostMenu
            ? 'post__settings__menu _visible'
            : 'post__settings__menu _hidden'
        }
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
          ></div>
          Delete
        </button>
        <button
          className='post__settings__menu__btn btn _hover'
          onClick={() => {
            setShowEditForm(true)
          }}
        >
          <div className='post__settings__menu__btn__dot'></div>
          <span style={{ marginRight: '15px' }}>Edit</span>
        </button>
      </div>
    </div>
  )
})
