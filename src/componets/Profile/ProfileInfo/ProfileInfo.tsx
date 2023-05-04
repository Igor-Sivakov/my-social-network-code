import { ChangeEvent, FC, memo, useState } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import userInfoAvatar from './../../../img/userInfoAvatar.jpeg'
import {
  Photos,
  ProfileExtraStateType,
  ProfileType,
} from '../../../Types/Types'
import { StatusType } from './ProfileStatus/ProfileStatus'
import { PFTopSegmentType } from './ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import Preloader from '../../common/preloader/preloader'
import ProfileData from './ProfileData/ProfileData'
import './ProfileInfo.css'

type PropsType = {
  photos: Photos
  fullName: string
  aboutMe: string
  lookingForAJob: string
  status: StatusType
  profile: ProfileType
  profileExtra: ProfileExtraStateType
  isOwner: boolean
  updateUserStatus: (status: StatusType) => void
  savePhoto: (file: File) => SavePhotoType
  saveProfileUpdate: (profile: PFTopSegmentType) => void
  updateProfileExtraState: (extraState: ProfileExtraStateType) => void
}

type SavePhotoType = Promise<PayloadAction<unknown, string, {}>>

type SetAddNewPhotoType = ((value: unknown) => unknown) | null | undefined

const ProfileInfo: FC<PropsType> = memo(
  ({ isOwner, fullName, savePhoto, photos, ...props }) => {
    const [addNewPhoto, setAddNewPhoto] = useState(false)
    const [editMod, setEditMod] = useState(false)
    const [editModForm, setEditModForm] = useState(true)

    if (!fullName) {
      return <Preloader />
    }

    const addNewProfilePhotoBtnOn = () => {
      setAddNewPhoto(true)
      setTimeout(() => {
        setAddNewPhoto(false)
      }, 10000)
    }

    const onMainPhotoSelected = (photo: ChangeEvent<HTMLInputElement>) => {
      if (photo.target.files?.length) {
        savePhoto(photo.target.files[0]).then(
          setAddNewPhoto(false) as SetAddNewPhotoType
        )
      }
    }

    return (
      <section className='profile-card__container'>
        <div>
          <div className='profile-card__avatar'>
            <img
              src={
                photos.large != null || undefined
                  ? photos.large
                  : userInfoAvatar
              }
              alt='avatar'
              onDoubleClick={addNewProfilePhotoBtnOn}
            />
          </div>
          {isOwner && addNewPhoto && (
            <label className='profile-card__avatar__add-new-photo-btn btn _hover'>
              Upload photo
              <input type={'file'} onChange={onMainPhotoSelected} />
            </label>
          )}
        </div>
        <div className='profile-card__info'>
          {editMod && isOwner ? (
            <ProfileDataForm
              {...props}
              setEditMod={setEditMod}
              editModForm={editModForm}
              saveProfileUpdate={props.saveProfileUpdate}
              updateProfileExtraState={props.updateProfileExtraState}
            />
          ) : (
            <ProfileData
              {...props}
              fullName={fullName}
              isOwner={isOwner}
              setEditModForm={setEditModForm}
              setEditMod={setEditMod}
            />
          )}
        </div>
      </section>
    )
  }
)

export default ProfileInfo
