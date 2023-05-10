import { instance } from './instance'

import { ProfileType } from '../types/reducers.types'
import { Photos } from '../types/other.types'

import { PFTopSegmentType } from '../components/Profile/ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment'
import { StatusType } from '../components/Profile/ProfileInfo/ProfileStatus/ProfileStatus'



export type ResponseDataType<D = {}, RC = ResultCodeEnum> = {
  data: D
  fieldsErrors: []
  messages: string[]
  resultCode: RC
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type SavePhotoType = {
  photos: Photos
}


export const profileAPI = {
  async getUserProfile(userId: number | null) {
    const response = await instance.get<ProfileType>(`profile/` + userId);

    return response.data;

  },

  async getStatus(userId: number | null) {
    const response = await instance.get<string>(`profile/status/` + userId);

    return response.data;
  },

  async updateStatus(status: StatusType) {
    const response = await instance.put<ResponseDataType>(`profile/status/`, { status: status });

    return response.data;
  },

  async savePhoto(photoFile: string | Blob) {
    const formData = new FormData()
    formData.append('image', photoFile)

    const response = await instance.put<ResponseDataType<SavePhotoType>>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data.photos;
  },

  async saveProfileUpdate(profile: PFTopSegmentType) {
    const response = await instance.put<ResponseDataType>(`profile`, profile);

    return response.data;
  },
}

