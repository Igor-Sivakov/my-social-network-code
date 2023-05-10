import { instance } from "./instance"
import { ResponseDataType, ResultCodeEnum, ResultCodeForCaptcha } from "./profileAPI"

type AuthDataType = {
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

