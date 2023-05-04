import userInfoAvatar from '../../img/userInfoAvatar.jpeg'
import userAvatar from '../../img/userAvatar.jpeg'
import {
  InferActionsType,
  ProfileExtraStateType,
  ProfileType,
  ThunkType,
} from '../../Types/Types'
import { StatusType } from '../../componets/Profile/ProfileInfo/ProfileStatus/ProfileStatus'
import { ResultCodeEnum, profileAPI } from '../../componets/API/profileAPI'
import { PFTopSegmentType } from '../../componets/Profile/ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const UPDATE_PROFILE_EXTRA_STATE = 'profile/UPDATE_PROFILE_EXTRA_STATE'

export type InitStProfileReduserType = {
  postsData: {
    id: number
    name: string
    avatar: string | undefined
    message: string
    likeCounts: number
  }[]
  profile: ProfileType
  profileExtraState: ProfileExtraStateType
  status: StatusType
}

type ActionsType = InferActionsType<typeof actions>

let initialState: InitStProfileReduserType = {
  postsData: [
    {
      id: 1,
      name: 'Dima',
      avatar: userAvatar,
      message: 'Hey,how are you?',
      likeCounts: 15,
    },
    {
      id: 2,
      avatar: userAvatar,
      name: 'Alina',
      message: "Yo, it's my fist post!",
      likeCounts: 21,
    },
    {
      id: 3,
      avatar: userAvatar,
      name: 'Ben',
      message: 'Yes I am!',
      likeCounts: 12,
    },
    {
      id: 4,
      avatar: userAvatar,
      name: 'Kim',
      message: 'Coco Loko! Alo Alo...',
      likeCounts: 36,
    },
  ],
  profile: {
    id: 25991,
    fullName: 'Sivakov Igor',
    aboutMe: 'I’ll come back and be stronger',
    lookingForAJobDescription: '//it-kamasutra.com',
    photos: {
      large: userInfoAvatar,
      small: userInfoAvatar,
    },
  },
  profileExtraState: {
    homePlace: 'Kiev, Ukrain',
    education: 'KPI 12',
  },
  status: '',
}

const profileReducer = (
  state: InitStProfileReduserType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ADD_POST:
      let randomId = Math.floor(Math.random() * 10) + 4
      let newPost = {
        id: randomId,
        name: 'userName',
        avatar: userAvatar,
        message: action.post,
        likeCounts: 0,
      }

      return {
        ...state,
        postsData: [...state.postsData, newPost],
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      }

    case UPDATE_PROFILE_EXTRA_STATE:
      return {
        ...state,
        profileExtraState: action.extraState,
      }

    default:
      return state
  }
}

export const actions = {
  addPost: (post: string) => ({ type: ADD_POST, post } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),

  setStatus: (status: StatusType) =>
    ({
      type: SET_STATUS,
      status,
    } as const),

  savePhotoSuccess: (photos: object) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),

  updateProfileExtraState: (extraState: ProfileExtraStateType) =>
    ({
      type: UPDATE_PROFILE_EXTRA_STATE,
      extraState,
    } as const),
}

const getUserProfile = (userId: number | null): ThunkType<ActionsType> => {
  return async (dispatch) => {
    let profileData = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(profileData))
  }
}

const getUserStatus = (userId: number | null): ThunkType<ActionsType> => {
  return async (dispatch) => {
    let userStatus = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(userStatus))
  }
}

const updateUserStatus = (status: StatusType): ThunkType<ActionsType> => {
  return async (dispatch) => {
    let updateStatus = await profileAPI.updateStatus(status)
    if (updateStatus.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setStatus(status))
    }
  }
}

const savePhoto = (file: File): ThunkType<ActionsType> => {
  return async (dispatch) => {
    let photoSaved = await profileAPI.savePhoto(file)
    dispatch(actions.savePhotoSuccess(photoSaved))
  }
}

const saveProfileUpdate =
  (formData: PFTopSegmentType): ThunkType<ActionsType> =>
  async (dispatch, getState) => {
    const userId = getState().auth.id
    let profileUpdateSaved = await profileAPI.saveProfileUpdate(formData)
    if (profileUpdateSaved.resultCode === ResultCodeEnum.Success) {
      dispatch(getUserProfile(userId))
    }
  }

export default profileReducer
