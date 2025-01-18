interface IChatCreate {
  members: string[]
  chat_type: string
}
interface IChatGet {
  _id: string
  members: string[]
  chat_type: string
  chat_name?: string
  createdAt?: string
  updatedAt?: string
  last_message?: string
  last_message_at?: string
  last_message_by?: string
}
export type { IChatCreate, IChatGet }
/*
    "members": ["6788d49a355efc3ca08505ad", "678a3cdcb6a6de6b29d74a08"],
    "chat_type": "direct"
*/
