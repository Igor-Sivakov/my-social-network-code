import { FC, memo } from 'react'

import { useAppSelector } from '../../../types/typedDispatch&Selector.types'

import { getPostsData } from '../../../redux/slices/profile-slice/profileSelectors'

import { PostsDataType } from '../../../types/reducers.types'

import Post from './Post/Post'

const MapPosts: FC = memo(() => {
  const postsData = useAppSelector(getPostsData)

  const postElements = postsData.map((post: PostsDataType) => (
    <div key={post.id}>
      <Post state={post} />
    </div>
  ))

  return <>{postElements}</>
})

export default MapPosts
