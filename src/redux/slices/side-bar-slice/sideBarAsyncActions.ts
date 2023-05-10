import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAPI } from '../../../API/userAPI'
import { PeoplesDataType } from '../../../types/reducers.types'


export const getPeoples = createAsyncThunk<PeoplesDataType[], void>(
  'sideBar/getPeoples',
  async (_, { rejectWithValue }) => {
    try {
      const { items } = await userAPI.getUser(1, 10, '', true)

      return items
    } catch (error) {
      console.warn(error)
      return rejectWithValue(error)
    }
  }
)