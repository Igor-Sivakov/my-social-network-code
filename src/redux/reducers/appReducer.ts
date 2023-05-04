import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from "@reduxjs/toolkit"
import { getAuth } from "./authReducer"



type InitStAppReduserType = {
  initialized: boolean,
  globalError: any,
}

let initialState: InitStAppReduserType = {
  initialized: false,
  globalError: null,
}

type AsyncThunkConfig = {}

export const initializeApp =
  createAsyncThunk(
    'app/initializeApp',
    async (_, { dispatch }) => {
      return await dispatch((getAuth() as AsyncThunkAction<void, void, AsyncThunkConfig>))
    }
  )

export const showGlobalError = createAsyncThunk<Promise<NodeJS.Timeout>, string | null>('app/showGlobalError',
  async (error, { dispatch }) => {
    await dispatch(appSlice.actions.addGlobalError(error))

    function resetGlobalError() {
      dispatch(appSlice.actions.addGlobalError(null))
    }

    return setTimeout(resetGlobalError, 9000)
  }
)


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializedSuccess(state) {
      state.initialized = true
    },
    addGlobalError(state, action: PayloadAction<string | null>) {
      state.globalError = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true
      })
  }
})


export default appSlice.reducer

export const { initializedSuccess, addGlobalError } = appSlice.actions

