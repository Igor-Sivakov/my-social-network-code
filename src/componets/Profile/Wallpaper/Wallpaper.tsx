import { ChangeEvent, FC, memo, useState } from 'react'
import { getWallpaper } from '../../../redux/selectors/profileSelectors'
import { useAppSelector } from '../../../Types/Types'
import './Wallpaper.css'

type PropsType = { isOwner: boolean }

const Wallpaper: FC<PropsType> = memo(({ isOwner }) => {
  const wallpaper = useAppSelector(getWallpaper)
  const [showBtn, setShowBtn] = useState(false)

  const showButtonHandler = () => {
    setShowBtn(true)
    setTimeout(() => {
      setShowBtn(false)
    }, 7000)
  }

  const onMainWallpaperSelected = (
    wallpaper: ChangeEvent<HTMLInputElement>
  ) => {
    if (wallpaper.target.files?.length) {
      // Server don't have API for the upload wallpaper
      console.log('Your wallpaper uploaded :)')
      console.log(wallpaper.target.files[0])
      setShowBtn(false)
    }
  }

  return (
    <section className='profile-content__wallpaper__container'>
      <div className='profile-content__wallpaper' onClick={showButtonHandler}>
        <img src={wallpaper} alt='background_img' />
      </div>
      {isOwner && showBtn && (
        <label className='profile-content__wallpaper__add-new-wallpaper-btn btn _hover'>
          Upload wallpaper
          <input type={'file'} onChange={onMainWallpaperSelected} />
        </label>
      )}
    </section>
  )
})

export default Wallpaper
