import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import userAvatar from '../../img/userAvatar.jpeg'
import { userAPI } from '../../componets/API/userAPI'
import { PeoplesDataType } from "../../Types/Types"



export type InitStSideBarReduserType = {
  peoplesData: PeoplesDataType[]
}

let initialState: InitStSideBarReduserType = {
  peoplesData: [
    {
      id: 1,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Dima',
      followed: true
    },
    {
      id: 2,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Alina',
      followed: true
    },
    {
      id: 3,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Ben',
      followed: true
    },
    {
      id: 4,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Vitaliy',
      followed: true
    },
    {
      id: 5,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Olga',
      followed: true
    },
    {
      id: 6,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Kate',
      followed: true
    },
    {
      id: 7,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Caren',
      followed: true
    },
    {
      id: 8,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Kostya',
      followed: true
    },
    {
      id: 9,
      photos: {
        large: userAvatar,
        small: userAvatar,
      },
      name: 'Inna',
      followed: true
    },
  ],
}


export const getPeoples = createAsyncThunk<PeoplesDataType[], void>(
  'sideBar/getPeoples',
  async () => {
    let peoples = await userAPI.getUser(1, 10, '', true).then((response) => response.items)
    return (peoples) as PeoplesDataType[]
  }
)


const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    noReducer() { }
  },
  extraReducers: (builder) => {
    builder.addCase(getPeoples.fulfilled, (state, action: PayloadAction<PeoplesDataType[]>) => {
      state.peoplesData = []
      state.peoplesData.push(...action.payload)
    })
  }
})

export default sideBarSlice.reducer


