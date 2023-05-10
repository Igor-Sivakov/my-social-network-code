import axios from "axios"

export let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    //Igor
    'API-KEY': '2a15240e-71ad-4b0b-a467-a808b7479bd1',
    //nomono
    //'API-KEY': '5427931a-35dd-4342-a223-b0b3e705ed5f',
  },
});