import { FC, memo, SetStateAction, useState } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../types/typedDispatch&Selector.types'

import { getUnfollow } from '../../redux/slices/user-slice/userAsyncActions'
import { getFriendsForDialogs } from '../../redux/slices/dialogs-slice/dialogsAsyncActions'

import {
  getDialogsData,
  getMessagesData,
} from '../../redux/slices/dialogs-slice/dialogsSelectors'

import { PeoplesDataType } from '../../types/reducers.types'

import DialogListItem from './DialogListItem/DialogListItem'
import InvertMessage from './Messages/InvertMessage/InvertMessage'
import Messages from './Messages/Messages'
import { EditTogglerDialogListItem } from './DialogListItem/EditTogglerDialogListItem'

import './DialogListItem/DialogListItem.scss'

export const DialogElements: FC = memo(() => {
  const dialogsData = useAppSelector(getDialogsData)
  const [isActive, setIsActive] = useState(null)
  const [showBtn, setShowBtn] = useState(null)

  const dispatch = useAppDispatch()

  let dialogElements = dialogsData.map((dialog) => (
    <div
      key={dialog.id}
      onClick={() => {
        setIsActive(dialog as PeoplesDataType & SetStateAction<null>)
      }}
      style={{ height: '70px' }}
      className={`${
        isActive === null
          ? dialog === dialogsData[0] && ' _active'
          : isActive === dialog && ' _active'
      }`}
    >
      {!!dialog.followed && <DialogListItem state={dialog} />}

      {showBtn === dialog && (
        <button
          onClick={() => {
            //@ts-ignore
            const id: number = dialog.id
            dispatch(getUnfollow(id))
            const getUpdatedList = () => dispatch(getFriendsForDialogs())
            setTimeout(getUpdatedList, 500)

            setShowBtn(null)
          }}
          className={'dialogs-list__delete-dialog-btn btn _hover _visible'}
        >
          <div className='dialogs-list__delete-dialog-btn__dot'></div>

          <span>delete dialog</span>
        </button>
      )}

      <EditTogglerDialogListItem
        isActive={isActive}
        dialog={dialog}
        setShowBtn={setShowBtn}
      />
    </div>
  ))

  return <>{dialogElements}</>
})

export const MessageElements: FC = () => {
  const messagesData = useAppSelector(getMessagesData)

  let messageElements = messagesData.map((mail) => {
    //user id emulator
    let j = ['2', '5', '7', '3']
    for (let i = 0; i < j.length; i++) {
      if (j[i] === mail.id) {
        return <InvertMessage state={mail} key={mail.id} />
      }
    }

    return <Messages state={mail} key={mail.id} />
  })

  return <>{messageElements}</>
}
