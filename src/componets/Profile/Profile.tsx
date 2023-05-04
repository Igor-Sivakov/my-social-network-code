import { FC, memo } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import {
  updateUserStatus,
  savePhoto,
  saveProfileUpdate,
  addPost,
  updateProfileExtraState,
  AddPostType,
} from '../../redux/reducers/profileReducer'
import {
  getProfile,
  getProfileAboutMe,
  getProfileExtra,
  getProfileFullName,
  getProfileLookingForAJob,
  getProfilePhotos,
  getProfileStatus,
} from '../../redux/selectors/profileSelectors'
import {
  ProfileExtraStateType,
  useAppDispatch,
  useAppSelector,
} from '../../Types/Types'
import { StatusType } from './ProfileInfo/ProfileStatus/ProfileStatus'
import { PFTopSegmentType } from './ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostForm from './PostsSection/PostForm/PostForm'
import Wallpaper from './Wallpaper/Wallpaper'
import MapPosts from './PostsSection/MapPosts'
import './Profile.css'

type PropsType = {
  authUserId: number | null
  userId: number | null
}

const Profile: FC<PropsType> = memo(({ userId, authUserId }) => {
  const profile = useAppSelector(getProfile)
  const profileExtra = useAppSelector(getProfileExtra)
  const photos = useAppSelector(getProfilePhotos)
  const fullName = useAppSelector(getProfileFullName)
  const aboutMe = useAppSelector(getProfileAboutMe)
  const lookingForAJob = useAppSelector(getProfileLookingForAJob)
  const status = useAppSelector(getProfileStatus)

  const dispatch = useAppDispatch()

  const addPostD = (post: AddPostType) => {
    dispatch(addPost(post))
  }

  const updateUserStatusD = (status: StatusType) => {
    dispatch(
      updateUserStatus(status) as AsyncThunkAction<void, StatusType, {}> &
        AnyAction
    )
  }

  const savePhotoD = (file: File) => {
    return dispatch(
      savePhoto(file) as AsyncThunkAction<void, File, {}> & AnyAction
    )
  }

  const saveProfileUpdateD = (profile: PFTopSegmentType) => {
    dispatch(
      saveProfileUpdate(profile) as AsyncThunkAction<
        void,
        PFTopSegmentType,
        {}
      > &
        AnyAction
    )
  }

  const updateProfileExtraStateD = (extraState: ProfileExtraStateType) => {
    dispatch(updateProfileExtraState(extraState))
  }

  const isOwner = !userId
  // eslint-disable-next-line eqeqeq
  const isOwnerById = userId == authUserId

  return (
    <main className='profile-content__container'>
      <div>
        <Wallpaper isOwner={isOwner || isOwnerById} />
        <ProfileInfo
          profile={profile}
          profileExtra={profileExtra}
          photos={photos}
          fullName={fullName}
          aboutMe={aboutMe}
          lookingForAJob={lookingForAJob}
          status={status}
          updateUserStatus={updateUserStatusD}
          isOwner={isOwner || isOwnerById}
          savePhoto={savePhotoD}
          saveProfileUpdate={saveProfileUpdateD}
          updateProfileExtraState={updateProfileExtraStateD}
        />
      </div>
      <PostForm fullName={fullName} avatar={photos} addPost={addPostD} />
      <MapPosts />
    </main>
  )
})

export default Profile
