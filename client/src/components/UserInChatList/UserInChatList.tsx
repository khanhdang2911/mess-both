import { Avatar } from 'flowbite-react'
import { IChatGet } from '../../interfaces/Chat'
import moment from 'moment'
import { useContext } from 'react'
import { HomeContext } from '../../context/HomeContext/HomeContext'
import { getAuthSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux'

interface UserInChatListProps {
  chat: IChatGet
  onClick?: () => void
}
const UserInChatList: React.FC<UserInChatListProps> = ({ chat, onClick }) => {
  const context = useContext(HomeContext)
  const auth: any = useSelector(getAuthSelector)
  if (!context) {
    return null
  }
  const { usersOnline, chatCurrentInfo } = context
  //Kiem tra xem user kia co online khong bang cach kiem tra xem trong chat do co user nao online khong tru minh ra
  const otherUserId = chat.members.find((member) => member !== auth.user._id)
  const checkUserIsOnline = usersOnline.some((user) => user.userId === otherUserId)
  return (
    <div
      onClick={onClick}
      key={chat._id}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer ${
        chatCurrentInfo?._id === chat._id ? 'bg-gray-100' : ''
      }`}
    >
      <div className='relative'>
        <Avatar img={chat.chat_avatar} rounded />
        {checkUserIsOnline && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between'>
          <p className='text-sm font-medium text-gray-900 truncate'>{chat.chat_name}</p>
          <span className='text-xs text-gray-500'>
            {chat.last_message_info?.createdAt ? moment(chat.last_message_info?.createdAt).fromNow() : ''}
          </span>
        </div>
        <p
          className={`text-sm truncate ${!chat.last_message_is_read ? 'text-black font-semibold' : 'text-gray-500'}  `}
        >
          {chat.last_message_info?.sender_id === auth.user._id ? 'You: ' : ''}
          {chat.last_message_info?.content}
        </p>
      </div>
    </div>
  )
}

export default UserInChatList
