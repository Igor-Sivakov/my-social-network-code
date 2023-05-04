import { FC } from 'react'
import './GlobalErrorMessage.css'

type PropsType = {
  error: string
}

const GlobalErrorMessage: FC<PropsType> = ({ error }) => {
  return (
    <div className='global-error-message__container'>
      <div className='global-error-message'>
        <div className='global-error-message__lable'>
          Ups, something went wrong :
        </div>
        {error}
      </div>
    </div>
  )
}

export default GlobalErrorMessage
