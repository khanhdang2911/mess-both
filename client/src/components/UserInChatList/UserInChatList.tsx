import { Avatar } from 'flowbite-react'
import { IChatGet } from '../../interfaces/Chat'
import moment from 'moment'

interface UserInChatListProps {
  chat: IChatGet
  onClick?: () => void
}
const UserInChatList: React.FC<UserInChatListProps> = ({ chat, onClick }) => {
  return (
    <div onClick={onClick} key={chat._id} className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer'>
      <div className='relative'>
        <Avatar img={chat.chat_avatar} rounded />
        {true && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between'>
          <p className='text-sm font-medium text-gray-900 truncate'>{chat.chat_name}</p>
          <span className='text-xs text-gray-500'>
            {chat.last_message_at ? moment(chat.last_message_at).fromNow() : ''}
          </span>
        </div>
        <p className='text-sm text-gray-500 truncate'>{chat?.last_message}</p>
      </div>
    </div>
  )
}

export default UserInChatList
