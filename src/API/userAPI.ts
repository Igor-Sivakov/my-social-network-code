import { instance } from "./instance"

import { ResponseDataType } from "./profileAPI"

import { UserDataType } from "../types/reducers.types"


type GetUsersResponseType = {
  items: UserDataType[]
  error: null | string
  totalCount: number
}

export const userAPI = {
  async getUser(currentPage = 1, pageSize = 10,
    term: string = '', friend: null | boolean = null) {

    const response = await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));

    return response.data;
  },

  async follow(userId: number) {
    const response = await instance.post<ResponseDataType>(`follow/${userId}`, {});

    return response.data;
  },

  async unfollow(userId: number) {
    const response = await instance.delete<ResponseDataType>(`follow/${userId}`);

    return response.data;
  },
}