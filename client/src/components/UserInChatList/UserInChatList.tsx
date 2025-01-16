import { Avatar } from "flowbite-react"

interface UserInChatListProps {
  user: {
    id: number
    firstname: string
    lastname: string
    avatar: string
    isOnline: boolean
    lastMessage: string
    time: string
  }
}
const UserInChatList: React.FC<UserInChatListProps> = ({ user }) => {
  return (
    <div key={user.id} className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer'>
      <div className='relative'>
        <Avatar img={user.avatar} rounded />
        {user.isOnline && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between'>
          <p className='text-sm font-medium text-gray-900 truncate'>
            {user.firstname} {user.lastname}
          </p>
          <span className='text-xs text-gray-500'>{user.time}</span>
        </div>
        <p className='text-sm text-gray-500 truncate'>{user.lastMessage}</p>
      </div>
    </div>
  )
}

export default UserInChatList
