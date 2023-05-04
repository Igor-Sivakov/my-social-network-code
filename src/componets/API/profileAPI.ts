import axios from 'axios'
import { Photos, ProfileType } from '../../Types/Types'
import { PFTopSegmentType } from '../Profile/ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment'
import { StatusType } from '../Profile/ProfileInfo/ProfileStatus/ProfileStatus'

export let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    //Igor
    'API-KEY': '2a15240e-71ad-4b0b-a467-a808b7479bd1',
    //nomono
    //'API-KEY': '5427931a-35dd-4342-a223-b0b3e705ed5f',
  },
});


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
  CaptchaIsReuired = 10
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

/* type AuthDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseType = {
  id: number
}

export const authAPI = {
  async getAuth() {
    const response = await instance.get<ResponseDataType<AuthDataType>>(`auth/me`);
    return response.data;
  },

  async signIn(formData: object) {
    const response = await instance.post<ResponseDataType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, formData);
    return response.data;
  },

  async signOut() {
    const response = await instance.delete<ResponseDataType>(`auth/login`);
    return response.data;
  },
}
 */

/* type CaptchaUrlType = {
  url: string
}

export const securityApi = {
  async getCaptchaUrl() {
    const response = await instance.get<CaptchaUrlType>(`security/get-captcha-url`);
    return response.data.url;
  },
} */
