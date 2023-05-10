import { createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit"

import { addGlobalError } from "./appReducer"
import { getAuth } from "../auth-slice/authAsyncActions"

type AsyncThunkConfig = {}

export const initializeApp =
  createAsyncThunk(
    'app/initializeApp',
    async (_, { dispatch }) => {
      try {
        return await dispatch((getAuth() as AsyncThunkAction<void, void, AsyncThunkConfig>))
      } catch (error) {
        console.warn(error)
      }
    }
  )

export const showGlobalError = createAsyncThunk<Promise<NodeJS.Timeout>, string | null>('app/showGlobalError',
  async (error, { dispatch }) => {
    dispatch(addGlobalError(error))

    function resetGlobalError() {
      dispatch(addGlobalError(null))
    }

    return setTimeout(resetGlobalError, 9000)
  }
)