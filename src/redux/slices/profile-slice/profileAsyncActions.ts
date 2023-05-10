import { createAsyncThunk } from "@reduxjs/toolkit"

import { savePhotoSuccess, setStatus, setUserProfile } from "./profileReducer"

import { ResultCodeEnum, profileAPI } from "../../../API/profileAPI"

import { StatusType } from "../../../components/Profile/ProfileInfo/ProfileStatus/ProfileStatus"
import { PFTopSegmentType } from "../../../components/Profile/ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment"



export const getUserProfile = createAsyncThunk<void, number | null>('profile/getUserProfile',
  async (userId, { dispatch }) => {
    try {
      const profileData = await profileAPI.getUserProfile(userId)

      dispatch(setUserProfile(profileData))
    } catch (error) {
      console.warn(error)
    }
  })

export const getUserStatus = createAsyncThunk<void, number | null>('profile/getUserStatus',
  async (userId, { dispatch }) => {
    try {
      const userStatus = await profileAPI.getStatus(userId)

      dispatch(setStatus(userStatus))
    } catch (error) {
      console.warn(error)
    }
  })

export const updateUserStatus = createAsyncThunk<void, StatusType>('profile/updateUserStatus',
  async (status, { dispatch }) => {
    try {
      const updateStatus = await profileAPI.updateStatus(status)

      if (updateStatus.resultCode === ResultCodeEnum.Success) {
        dispatch(setStatus(status))
      }
    } catch (error) {
      console.warn(error)
    }
  })

export const savePhoto = createAsyncThunk<void, File>('profile/savePhoto',
  async (file, { dispatch }) => {
    try {
      const photoSaved = await profileAPI.savePhoto(file)

      dispatch(savePhotoSuccess(photoSaved))
    } catch (error) {
      console.warn(error)
    }
  })

export const saveProfileUpdate = createAsyncThunk<void, PFTopSegmentType, { state: { auth: { id: number } } }>('profile/saveProfileUpdate',
  async (formData, { dispatch, getState }) => {
    try {
      const userId = getState().auth.id
      const profileUpdateSaved = await profileAPI.saveProfileUpdate(formData)

      if (profileUpdateSaved.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserProfile(userId))
      }
    } catch (error) {
      console.warn(error)
    }
  })