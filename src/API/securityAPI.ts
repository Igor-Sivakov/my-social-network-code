import { instance } from "./instance"


type CaptchaUrlType = {
  url: string
}

export const securityApi = {
  async getCaptchaUrl() {
    const response = await instance.get<CaptchaUrlType>(`security/get-captcha-url`);

    return response.data.url;
  },
}