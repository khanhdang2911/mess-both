interface IMessageCreate {
  chat_id: string
  type: string
  content: string
  status?: string
}

interface IMessageResponse {
  _id: string
  chat_id: string
  type: string
  status: string
  content: string
  sender_id: string
  createdAt: string
  updatedAt: string
  sender?: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
  }
}

export type { IMessageCreate, IMessageResponse }
/*
    "chat_id": "678b5d60f4b9727395ae7468",
    "type": "text",
    "content": "T toi roi ne?",
    "status": "sent",
*/

/*
 "_id": "678cc228e248493bc1bfbd95",
 "chat_id": "678b5d60f4b9727395ae7468",
 "content": "v tốt r =))",
 "sender_id": "6789bebf2f5ce9359e5b6058",
 "createdAt": "2025-01-19T09:13:12.931Z",
 "updatedAt": "2025-01-19T09:13:12.931Z",
 "sender": {
 "_id": "6789bebf2f5ce9359e5b6058",
 "firstname": "Nguyen",
 "lastname": "Xuan Khanh",
 "avatar": "https://i.pinimg.com/736x/34/d6/4e/34d64eab07d900f691d7c04353b16f88.jpg"
 }
*/
