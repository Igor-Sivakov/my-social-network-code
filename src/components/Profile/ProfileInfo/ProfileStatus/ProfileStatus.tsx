import { useState, useEffect, FC, ChangeEvent, memo } from 'react'
import './ProfileStatus.css'

type PropsType = {
  isOwner: boolean
  status: StatusType
  updateUserStatus: (status: StatusType) => void
}

export type StatusType = string | number | undefined

const ProfileStatus: FC<PropsType> = memo(
  ({ status, isOwner, updateUserStatus }) => {
    let [editMode, setEditMode] = useState(false)
    let [newStatus, setStatus] = useState<StatusType>(status)

    useEffect(() => {
      setStatus(status)
    }, [status])

    let activateEditMode = (isOwner: boolean) => {
      if (isOwner) setEditMode(true)
    }

    let deactivateEditMode = () => {
      setEditMode(false)
      updateUserStatus(newStatus)
    }

    let onStatusChange = (text: ChangeEvent<HTMLInputElement>) => {
      setStatus(text.currentTarget.value)
    }

    return (
      <div>
        <div>
          {!editMode && (
            <span
              onDoubleClick={() => {
                activateEditMode(isOwner)
              }}
            >
              {status || '----------------'}
            </span>
          )}
        </div>

        <div>
          {editMode && (
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={deactivateEditMode}
              value={newStatus}
              className='profile-card__status'
            ></input>
          )}
        </div>
      </div>
    )
  }
)

export default ProfileStatus
