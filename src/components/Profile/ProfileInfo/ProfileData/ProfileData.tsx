import { FC, memo } from 'react'

import { ProfileExtraStateType } from '../../../../types/reducers.types'
import ProfileStatus, { StatusType } from '../ProfileStatus/ProfileStatus'

import './ProfileData.css'

type PropsType = {
  aboutMe: string
  lookingForAJob: string
  status: StatusType
  fullName: string
  profileExtra: ProfileExtraStateType
  isOwner: boolean
  updateUserStatus: (status: StatusType) => void
  setEditModForm: (arg0: boolean) => void
  setEditMod: (arg0: boolean) => void
}

const ProfileData: FC<PropsType> = memo(
  ({
    aboutMe,
    lookingForAJob,
    fullName,
    profileExtra: { homePlace, education },
    setEditModForm,
    setEditMod,
    ...props
  }) => {
    const toEditMod = (boolean: boolean) => {
      setEditMod(true)
      setEditModForm(boolean)
    }

    return (
      <div className='profile-card__info__container'>
        <h3
          className='profile-card__info__user-name'
          onDoubleClick={() => {
            toEditMod(true)
          }}
        >
          {fullName != null ? fullName : 'Igor Sivakov'}
        </h3>

        <ProfileStatus
          isOwner={props.isOwner}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />

        <p
          className='profile-card__info__data _margin-top'
          onDoubleClick={() => {
            toEditMod(true)
          }}
        >
          About me:&ensp;
          {aboutMe != null ? aboutMe : 'I’ll come back and be stronger'}
        </p>

        <p
          className='profile-card__info__data'
          onDoubleClick={() => {
            toEditMod(true)
          }}
        >
          Looking for a job:&ensp;
          {lookingForAJob != null ? lookingForAJob : '//it-kamasutra.com'}
        </p>

        <p
          className='profile-card__info__data'
          onDoubleClick={() => {
            toEditMod(false)
          }}
        >
          Lives in:&ensp;{homePlace}
        </p>

        <p
          className='profile-card__info__data'
          onDoubleClick={() => {
            toEditMod(false)
          }}
        >
          Education:&ensp;{education}
        </p>
      </div>
    )
  }
)
export default ProfileData
