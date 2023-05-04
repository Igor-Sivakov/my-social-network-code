import { getFollow } from '../reducers/usersReduser'
import { ResponseDataType, ResultCodeEnum } from '../../componets/API/profileAPI'
import { userAPI } from './../../componets/API/userAPI'
import { actions, getUnfollow } from './userReducerForTest'


jest.mock('./../../componets/API/API')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  userAPIMock.follow.mockClear()
  userAPIMock.unfollow.mockClear()
})

const result: ResponseDataType = {
  data: {},
  fieldsErrors: [],
  messages: [],
  resultCode: ResultCodeEnum.Success
}


test('success follow thunk', async () => {
  const thunk = getFollow(2)

  userAPIMock.follow.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress
    (true, 2))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress
    (false, 2))

})

test('success unfollow thunk', async () => {
  const thunk = getUnfollow(2)

  userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress
    (true, 2))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress
    (false, 2))
})