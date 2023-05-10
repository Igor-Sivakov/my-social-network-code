import pic1 from '../../../assets/img/ImgForPosts/pic1.jpeg'
import pic2 from '../../../assets/img/ImgForPosts/pic2.jpeg'
import pic4 from '../../../assets/img/ImgForPosts/pic4.jpeg'
import pic5 from '../../../assets/img/ImgForPosts/pic5.jpeg'
import pic6 from '../../../assets/img/ImgForPosts/pic6.jpeg'
import pic7 from '../../../assets/img/ImgForPosts/pic7.jpeg'
import pic8 from '../../../assets/img/ImgForPosts/pic8.jpeg'
import pic10 from '../../../assets/img/ImgForPosts/pic10.jpeg'
import pic11 from '../../../assets/img/ImgForPosts/pic11.jpeg'
import userInfoAvatar from '../../../assets/img/userInfoAvatar.jpeg'


export const initialPostsData = [
  {
    id: '1',
    name: 'Michel Foss',
    avatar: pic8,
    message: 'When I was working on downshift, I came across a situation where my users (myself included) needed the ability to at any time reset the dropdown we were building to its initial state: no input value, nothing highlighted, nothing selected, closed. But I also had users who wanted the "initial state" to have some default input, default selection, or remain open. So I came up with the state initializers pattern to support all these use cases. The state initializer pattern allows you to expose an API to users to be able to reset your component to its original state without having to completely unmount and remount the component. Actually, this pattern is similar in some ways to defaultValue in HTML. Sometimes the consumer of your hook or component wants to initialize the value of your state. The state initializer pattern allows you to do that.',
    likeCounts: 15,
    comments: [
      {
        commentId: '11',
        avatar: pic4,
        userName: 'Jane Ostin',
        comment: 'Yes, same story every time. It`s very exciting,one problem many solutions)',
      },
      {
        commentId: '12',
        avatar: pic11,
        userName: 'John Doe',
        comment: 'Hi, very  interesting story! I have the same) ',
      },
      {
        commentId: '13',
        avatar: pic10,
        userName: 'Tony Montana',
        comment: 'Men, good job! Thanks for sharing your experience.',
      },
      {
        commentId: '14',
        avatar: pic1,
        userName: 'Alise Brekstone',
        comment: 'I have a question,about building initial state. Can you text me?',
      },

    ]
  },
  {
    id: '2',
    avatar: pic2,
    name: 'Alina Kereeva',
    message: 'We know the voices in our heads are`t real, but sometimes their ideas are just too good to ignore.',
    likeCounts: 21,
    comments: [{
      commentId: '21',
      avatar: pic5,
      userName: 'Kite Doe',
      comment: 'Success is the ability to go from failure without losing your enthusiasm.',
    },
    {
      commentId: '22',
      avatar: pic1,
      userName: 'Alise Brekstone',
      comment: 'So cute :)',
    }]
  },
  {
    id: '3',
    avatar: pic7,
    name: 'Ben Hodges',
    message: 'So you have a bit of state in React, and you want to sync it with a form field. How do you do it?Well, it depends on the type of form control: text inputs, selects, checkboxes, and radio buttons all work a little bit differently.The good news is that while the details vary, they all share the same fundamental mechanism. There`s a consistent philosophy in React when it comes to data binding.In this tutorial, we`ll first learn how React approaches data binding, and then I`ll show you how each form field works, one by one. We`ll look at complete, real-world examples. I`ll also share some tips I`ve learned over the years, and some “gotchas” to watch out for!',
    likeCounts: 12,
    comments: [{
      commentId: '31',
      avatar: pic11,
      userName: 'John Doe',
      comment: 'Oh, interesting topic of discussion. So, this binding realy work that way? ',
    },]
  },
  {
    id: '4',
    avatar: pic11,
    name: 'John Doe',
    message: 'If you`ve struggled to make sense of useMemo and useCallback, you`re not alone! I`ve spoken with so many React devs who have been scratching their heads about these two hooks.Alright, so let`s start with useMemo.The fundamental idea with useMemo is that it allows us to `remember` a computed value between renders.This definition requires some unpacking. In fact, it requires a pretty sophisticated mental model of how React works! So lets address that first.The main thing that React does is keep our UI in sync with our application state. The tool that it uses to do this is called a `re-render`.Each re-render is a snapshot of what the application`s UI should look like at a given moment in time, based on the current application state. We can think of it like a stack of photographs, each one capturing how things looked given a specific value for every state variable.The state initializer pattern is pretty simple. In fact, for a long time I removed it from my Advanced React Patterns workshop because I didn`t think it was worth the time. But after a few times delivering that workshop without it, people started asking me about the problems it solves so I`ve added it back. Hope this post helps you in your work. Good luck!',
    likeCounts: 36,
    comments: [{
      commentId: '41',
      avatar: pic6,
      userName: 'Katline Moss',
      comment: 'Can you tell more about that?... ',
    },
    {
      commentId: '42',
      avatar: pic10,
      userName: 'Tony Montana',
      comment: 'Thank you men for information about useMemo & useCallback! It was wery usefull.',
    }]
  },
]

export const initialProfileData = {
  id: 25991,
  fullName: 'Sivakov Igor',
  aboutMe: 'I’ll come back and be stronger',
  lookingForAJobDescription: '//it-kamasutra.com',
  photos: {
    large: userInfoAvatar,
    small: userInfoAvatar,
  },
}

export const initialProfileExtraStateData = {
  homePlace: 'Kiev, Ukraine',
  education: 'NUFT 10',
}