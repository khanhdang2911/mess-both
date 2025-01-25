import { IMessageResponse } from './Message'

interface IChatCreate {
  members: string[]
  chat_type: string
}
interface IChatGet {
  _id: string
  members: string[]
  chat_type: string
  chat_avatar?: string
  chat_name?: string
  createdAt?: string
  updatedAt?: string
  last_message_id?: string
  last_message_is_read?: boolean
  last_message_info?: IMessageResponse
}
export type { IChatCreate, IChatGet }
/*
    "members": ["6788d49a355efc3ca08505ad", "678a3cdcb6a6de6b29d74a08"],
    "chat_type": "direct"
*/

/*
  {
            "_id": "678b5d60f4b9727395ae7468",
            "members": [
                "6788d49a355efc3ca08505ad",
                "6789bebf2f5ce9359e5b6058"
            ],
            "chat_type": "direct",
            "createdAt": "2025-01-18T07:50:56.659Z",
            "updatedAt": "2025-01-23T06:29:01.442Z",
            "__v": 0,
            "chat_name": "Dang Xuan Khanh",
            "chat_avatar": "https://i.pinimg.com/736x/61/32/f8/6132f803220b5a4a8e9707926f307ea2.jpg",
            "last_message_id": "6791e07a847a61ff5397ee35",
            "last_message_info": [
                {
                    "_id": "6791e07a847a61ff5397ee35",
                    "chat_id": "678b5d60f4b9727395ae7468",
                    "type": "text",
                    "content": "Nhan duoc tin nhan khong?",
                    "sender_id": "6789bebf2f5ce9359e5b6058",
                    "status": "sent",
                    "is_deleted": false,
                    "is_edited": false,
                    "createdAt": "2025-01-23T06:23:54.828Z",
                    "updatedAt": "2025-01-23T06:23:54.828Z",
                    "__v": 0
                }
            ]
        }
*/
