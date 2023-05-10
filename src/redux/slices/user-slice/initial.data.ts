import userAvatar from '../../../assets/img/userAvatar.jpeg'
import userInfoAvatar from '../../../assets/img/userInfoAvatar.jpeg'



export const initialUsersData = [
  {
    name: 'Leo Largo',
    photos: {
      large: userAvatar,
      small: userInfoAvatar,
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
      large: userAvatar,
      small: userInfoAvatar,
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
      large: userAvatar,
      small: userInfoAvatar,
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
      large: userAvatar,
      small: userInfoAvatar,
    },
    id: 4,
    country: 'Spain',
    city: 'Barselona',
    status: 'Beautiful & sexy.',
    followed: false
  },
  {
    name: 'Sasha Lenovskiy',
    photos: {
      large: userAvatar,
      small: userInfoAvatar,
    },
    id: 5,
    country: 'Ukrain',
    city: 'Kiev',
    status: 'Yanki go home!!!',
    followed: true
  },
]