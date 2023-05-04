import { FC, memo, SetStateAction, useState } from 'react'
import { getFriendsForDialogs } from '../../redux/reducers/dialogsReducer'
import { getUnfollow } from '../../redux/reducers/usersReduser'
import {
  getDialogsData,
  getMessagesData,
} from '../../redux/selectors/dialogsSelectors'
import {
  PeoplesDataType,
  useAppDispatch,
  useAppSelector,
} from '../../Types/Types'
import DialogListItem from './DialogListItem/DialogListItem'
import InvertMessage from './Messages/InvertMessage/InvertMessage'
import Messages from './Messages/Messages'
import { EditTogglerDialogListItem } from './DialogListItem/EditTogglerDialogListItem'
import './DialogListItem/DialogListItem.scss'

export const DialogElements: FC = memo((): any => {
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

  return dialogElements
})

export const MessageElemets: FC = (): any => {
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
  return messageElements
}
