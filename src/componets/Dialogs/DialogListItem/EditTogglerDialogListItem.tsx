import { FC, memo, SetStateAction, useEffect, useState } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { PeoplesDataType } from '../../../Types/Types'

type TogglerPropsType = {
  dialog: (PeoplesDataType & ((prevState: null) => null)) | PeoplesDataType
  setShowBtn: (value: (PeoplesDataType & SetStateAction<null>) | null) => void
  isActive: PeoplesDataType | null
}

export const EditTogglerDialogListItem: FC<TogglerPropsType> = memo(
  ({ dialog, setShowBtn, isActive }) => {
    const [isTogglerShown, setIsTogglerShown] = useState(true)
    const [timeOutID, setTimeOutID] = useState()
    useEffect(() => {
      if (isActive === dialog) {
        setIsTogglerShown(true)
        setShowBtn(null)
        clearTimeout(timeOutID)
      } else {
        setIsTogglerShown(true)
        clearTimeout(timeOutID)
      } // eslint-disable-next-line
    }, [isActive, dialog])

    return (
      <div
        onClick={() => {
          setShowBtn(dialog as PeoplesDataType & ((prevState: null) => null))
          setIsTogglerShown(false)
          const hideBtn = () => {
            setIsTogglerShown(true)
            setShowBtn(null)
          }
          let timeoutId = setTimeout(hideBtn, 5000)
          setTimeOutID(timeoutId as NodeJS.Timeout & SetStateAction<undefined>)
        }}
      >
        {isTogglerShown && (
          <EllipsisOutlined className='dialogs-list__edit-toggler _visible' />
        )}
      </div>
    )
  }
)
