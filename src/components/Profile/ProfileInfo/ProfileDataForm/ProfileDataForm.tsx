import { FC, memo } from 'react'

import {
  ProfileExtraStateType,
  ProfileType,
} from '../../../../types/reducers.types'

import ProfileFormTopSegment, {
  PFTopSegmentType,
} from './ProfileFormSegments/ProfileFormTopSegment'
import ProfileFormBottomSegment from './ProfileFormSegments/ProfileFormBottomSegment'

import './ProfileDataForm.css'

type PropsType = {
  profile: ProfileType
  profileExtra: ProfileExtraStateType
  editModForm: boolean
  setEditMod: (arg0: boolean) => void
  saveProfileUpdate: (profile: PFTopSegmentType) => void
  updateProfileExtraState: (extraState: ProfileExtraStateType) => void
}

const ProfileDataForm: FC<PropsType> = memo(
  ({
    editModForm,
    setEditMod,
    saveProfileUpdate,
    updateProfileExtraState,
    profile,
    profileExtra,
  }) => {
    return (
      <div className='profile-info-form__container'>
        {editModForm ? (
          <ProfileFormTopSegment
            initialValues={profile}
            saveProfileUpdate={saveProfileUpdate}
            setEditMod={setEditMod}
          />
        ) : (
          <ProfileFormBottomSegment
            initialValues={profileExtra}
            updateProfileExtraState={updateProfileExtraState}
            setEditMod={setEditMod}
          />
        )}
      </div>
    )
  }
)

export default ProfileDataForm
