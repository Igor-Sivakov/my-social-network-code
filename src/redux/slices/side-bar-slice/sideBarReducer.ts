import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialPeoplesData } from './initial.data'

import { getPeoples } from './sideBarAsyncActions'

import { PeoplesDataType } from '../../../types/reducers.types'



export type InitStSideBarReducerType = {
  peoplesData: PeoplesDataType[]
}

const initialState: InitStSideBarReducerType = {
  peoplesData: initialPeoplesData,
}


const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    noReducers() { }
  },
  extraReducers: (builder) => {
    builder.addCase(getPeoples.fulfilled, (state, action: PayloadAction<PeoplesDataType[]>) => {
      state.peoplesData = []
      state.peoplesData.push(...action.payload)
    })
  }
})

export default sideBarSlice.reducer


