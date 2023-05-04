import usersReduser, { actions, InitStUsersReduserType } from './userReducerForTest'

let state: InitStUsersReduserType

beforeEach(() => {
  state = {
    usersData: [
      {
        name: 'Leo Largo',
        photos: {
          large: undefined,
          small: undefined,
        },
        id: 1,
        country: 'USA',
        city: 'New York',
        status: 'Hi guys! Tomorrow I will be boarding, who is with me?',
        followed: false
      },
      {
        name: 'Finch',
        photos: {
          large: undefined,
          small: undefined,
        },
        id: 2,
        country: 'USA',
        city: 'Chicago',
        status: 'I am wery funny...',
        followed: false
      },
      {
        name: 'Tata',
        photos: {
          large: undefined,
          small: undefined,
        },
        id: 3,
        country: 'United Kingdom',
        city: 'London',
        status: 'Like boarding...',
        followed: true
      },
      {
        name: 'Vanessa Leais',
        photos: {
          large: undefined,
          small: undefined,
        },
        id: 4,
        country: 'Spain',
        city: 'Barselona',
        status: 'Beautiful & sexy.',
        followed: true
      },
      {
        name: 'Sasha Lenovskiy',
        photos: {
          large: undefined,
          small: undefined,
        },
        id: 5,
        country: 'Ukrain',
        city: 'Kiev',
        status: 'Yanki go home!!!',
        followed: false
      },
    ],
    pageSize: 5,
    totalUsersCount: 30,
    setCurrentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
      term: '',
      friend: null
    }
  }
})


test('follow success', () => {
  const newState = usersReduser(state, actions.follow(2))

  expect(newState.usersData[0].followed).toBeFalsy()
  expect(newState.usersData[1].followed).toBeTruthy()
})

test('unfollow success', () => {
  const newState = usersReduser(state, actions.unfollow(3))

  expect(newState.usersData[2].followed).toBeFalsy()
  expect(newState.usersData[3].followed).toBeTruthy()
})