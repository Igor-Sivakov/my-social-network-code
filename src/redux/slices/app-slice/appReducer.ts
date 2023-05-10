import { createSlice, PayloadAction, } from "@reduxjs/toolkit"
import { initializeApp } from "./appAsyncActions"


type InitStAppReducerType = {
  initialized: boolean,
  globalError: any,
}

const initialState: InitStAppReducerType = {
  initialized: false,
  globalError: null,
}


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

