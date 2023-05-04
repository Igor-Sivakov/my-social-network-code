import { ProfileExtraStateType } from "../../Types/Types"
import { ChatMessageFormValuesType } from "../Chat/Messages&Form/ChatMessageForm/ChatMessageForm"
import { MessageFormValuesType } from "../Dialogs/MessageForm/MessageForm"
import { LoginFormType } from "../Login/LoginForm"
import { EditPostAddCommentValuesType } from "../Profile/PostsSection/Post/PostCommentForm/PostCommentForm"
import { PostFormValuesType } from "../Profile/PostsSection/PostForm/PostFormComponent"
import { PFTopSegmentType } from "../Profile/ProfileInfo/ProfileDataForm/ProfileFormSegments/ProfileFormTopSegment"

/* Login form  */

export const formValidatorAuth = (values: LoginFormType) => {
  const errors = {} as any
  if (!values.email) {
    errors.email = 'Field is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  } else if (values.email.length < 4) {
    errors.email = `Min length is 4 symbols`
  } else if (values.email.length > 30) {
    errors.email = `Max length is 30 symbols`
  }
  if (!values.password) {
    errors.password = 'Field is required'
  } else if (values.password.length < 4) {
    errors.password = `Min length is 4 symbols`
  } else if (values.password.length > 20) {
    errors.password = `Max length is 20 symbols`
  }
  return errors
}

/* Profile data  */

export const formValidatorProfTopSegment = (values: PFTopSegmentType) => {
  const errors = {} as any
  if (!values.fullName) {
    errors.fullName = 'Field is required'
  } else if (values.fullName.length < 4) {
    errors.fullName = `Min length is 4 symbols`
  } else if (values.fullName.length > 30) {
    errors.fullName = `Max length is 30 symbols`
  }
  if (!values.aboutMe) {
    errors.aboutMe = 'Field is required'
  } else if (values.aboutMe.length < 4) {
    errors.aboutMe = `Min length is 4 symbols`
  } else if (values.aboutMe.length > 70) {
    errors.aboutMe = `Max length is 50 symbols`
  }
  if (!values.lookingForAJobDescription) {
    errors.lookingForAJobDescription = 'Field is required'
  } else if (values.lookingForAJobDescription.length < 4) {
    errors.lookingForAJobDescription = `Min length is 4 symbols`
  } else if (values.lookingForAJobDescription.length > 70) {
    errors.lookingForAJobDescription = `Max length is 50 symbols`
  }
  return errors
}

export const formValidatorProfBottomSegment = (values: ProfileExtraStateType) => {
  const errors = {} as any
  if (!values.homePlace) {
    errors.homePlace = 'Field is required'
  } else if (values.homePlace.length < 4) {
    errors.homePlace = `Min length is 4 symbols`
  } else if (values.homePlace.length > 50) {
    errors.homePlace = `Max length is 50 symbols`
  }
  if (!values.education) {
    errors.education = 'Field is required'
  } else if (values.education.length < 4) {
    errors.education = `Min length is 4 symbols`
  } else if (values.education.length > 50) {
    errors.education = `Max length is 50 symbols`
  }
  return errors
}

/* Dialogs, Chat , Posts & Comment message form  */

export const formValidatorPost = (values: PostFormValuesType) => {
  const errors = {} as any
  if (values.post_form__text.length < 1) {
    errors.messageText = ''
  } else if (values.post_form__text.length > 1000) {
    errors.message_form__text = `Max length is 1000 symbols`
  }

  return errors
}

export const formValidatorMessage = (values: MessageFormValuesType) => {
  const errors = {} as any
  if (values.message_form__text.length < 1) {
    errors.messageText = ''
  } else if (values.message_form__text.length > 1000) {
    errors.message_form__text = `Max length is 1000 symbols`
  }

  return errors
}

export const formValidatorChat = (values: ChatMessageFormValuesType) => {
  const errors = {} as any
  if (values.chat_message_form__text.length < 1) {
    errors.messageText = ''
  } else if (values.chat_message_form__text.length > 500) {
    errors.message_form__text = `Max length is 1000 symbols`
  }

  return errors
}

export const formValidatorPostComment = (values: EditPostAddCommentValuesType) => {
  const errors = {} as any
  if (values.post_comment_form__text.length < 1) {
    errors.messageText = ''
  } else if (values.post_comment_form__text.length > 500) {
    errors.message_form__text = `Max length is 1000 symbols`
  }

  return errors
}