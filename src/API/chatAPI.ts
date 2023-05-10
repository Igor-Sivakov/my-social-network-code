
export type ChatMessageAPIType = {
  message: string
  photo: string | undefined
  userId: number
  userName: string
}

export type ChatMessageType = ChatMessageAPIType & { id: string }

export type StatusType = 'pending' | 'ready' | 'error'

export type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void

export type StatusChangedSubscriberType = (status: StatusType) => void

let ws: WebSocket | null = null

type EventsNamesType = 'messages-received' | 'status-changed'

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}


const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('Some error occurred. Please refresh the page.')
}


const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  )
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
  start() {
    createChannel()
  },

  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },

  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    subscribers[eventName].push(callback as MessagesReceivedSubscriberType & StatusChangedSubscriberType)
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => s !== callback)
    }
  },

  unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => s !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  }
}