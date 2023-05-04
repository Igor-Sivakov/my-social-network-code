import { v1 } from 'uuid'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import userAvatar from '../../img/userAvatar.jpeg'
import pic1 from '../../img/ImgForPosts/pic1.jpeg'
import myAvatar from '../../img/ImgForPosts/myAvatar.jpg'
import { userAPI } from '../../componets/API/userAPI'
import { MessagesDataType, PeoplesDataType } from '../../Types/Types'



export type InitStDialogsReduserType = {
  dialogsData: PeoplesDataType[]
  messagesData: MessagesDataType[]
}

type AddNewMessage = {
  message: string
  avatar: string | undefined
}

let initialState: InitStDialogsReduserType = {
  dialogsData: [
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
  messagesData: [
    {
      id: '1',
      avatar: myAvatar,
      name: 'Sivakov_Igor',
      message: 'Hey, how is it going? When you come back?',
    },
    {
      id: '2',
      avatar: pic1,
      name: 'Alise Brekstone',
      message: 'I am having a great time in London) And you?',
    },
    {
      id: '3',
      avatar: pic1,
      name: 'Alise Brekstone',
      message: 'Maybe on Wednesday evening. Do you want to meet me?',
    },
    {
      id: '4',
      avatar: myAvatar,
      name: 'Sivakov_Igor',
      message: 'Sure, I’d love to see you)',
    },
    {
      id: '5',
      avatar: pic1,
      name: 'Alise Brekstone',
      message: 'So, I’ll be wiating for you at Grand Central on Wednesday at 19:15. You already know where we’re going?',
    },

  ],
}

export const getFriendsForDialogs = createAsyncThunk<void, void>('dialogs/getFriendsForDialogs',
  async (_, { dispatch }) => {
    let response = await userAPI.getUser(1, 10, '', true)
    dispatch(dialogsSlice.actions.addFriendsForDialogs(response.items))
  })


const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    sendNewMessageBody(state, action: PayloadAction<AddNewMessage>) {

      let messageBody = {
        id: v1(),
        avatar: action.payload.avatar,
        name: 'user',
        message: action.payload.message,
      }

      return {
        ...state,
        messagesData: [...state.messagesData, messageBody],
      }
    },
    addFriendsForDialogs(state, action: PayloadAction<PeoplesDataType[]>) {
      state.dialogsData = []
      state.dialogsData.push(...action.payload)
    }
  }
})

export default dialogsSlice.reducer
export const { sendNewMessageBody } = dialogsSlice.actions

