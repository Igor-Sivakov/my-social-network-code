import { instance } from "./profileAPI"

type CaptchaUrlType = {
  url: string
}

export const securityApi = {
  async getCaptchaUrl() {
    const response = await instance.get<CaptchaUrlType>(`security/get-captcha-url`);
    return response.data.url;
  },
}