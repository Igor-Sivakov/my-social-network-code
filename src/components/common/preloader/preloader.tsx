import { FC } from 'react'
import preloader from '../../../assets/img/preloader.svg'

import './preloader.css'

const Preloader: FC = () => {
  return (
    <div className='preloader__container'>
      <img src={preloader} alt='fetching preloader img' />
    </div>
  )
}

export default Preloader
