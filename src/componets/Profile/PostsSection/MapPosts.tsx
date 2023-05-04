import { FC, memo } from 'react'
import { getPostsData } from '../../../redux/selectors/profileSelectors'
import { PostsDataType, useAppSelector } from '../../../Types/Types'
import Post from './Post/Post'

const MapPosts: FC = memo(() => {
  const postsData = useAppSelector(getPostsData)

  let postElements = postsData.map((post: PostsDataType) => (
    <div key={post.id}>
      <Post state={post} />
    </div>
  ))
  return <>{postElements}</>
})

export default MapPosts
