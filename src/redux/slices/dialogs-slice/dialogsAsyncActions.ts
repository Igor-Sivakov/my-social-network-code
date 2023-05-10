import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAPI } from '../../../API/userAPI'
import { addFriendsForDialogs } from './dialogsReducer'




export const getFriendsForDialogs = createAsyncThunk<void, void>('dialogs/getFriendsForDialogs',
  async (_, { dispatch }) => {
    try {
      const response = await userAPI.getUser(1, 10, '', true)

      dispatch(addFriendsForDialogs(response.items))
    } catch (error) {
      console.warn(error)
    }
  })