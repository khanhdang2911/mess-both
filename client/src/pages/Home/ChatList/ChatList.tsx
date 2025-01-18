import { Avatar, TextInput } from 'flowbite-react'
import { HiSearch, HiPlus } from 'react-icons/hi'
import UserInChatList from '../../../components/UserInChatList/UserInChatList'
import { useEffect, useState } from 'react'
import { IUserGet } from '../../../interfaces/User'
import { getAllUsers } from '../../../api/user.api'
import { getChatsByUser } from '../../../api/chat.api'
import { IChatGet } from '../../../interfaces/Chat'
const USERS = [
  {
    id: 1,
    firstname: 'Anna',
    lastname: 'Smith',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'See you tomorrow!',
    time: '2m'
  },
  {
    id: 2,
    firstname: 'Jeff',
    lastname: 'Bezos',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'Great idea!',
    time: '1h'
  },
  {
    id: 3,
    firstname: 'Tony Stark',
    lastname: 'Iron',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'Hey, Are you there?',
    time: '10min'
  },
  {
    id: 4,
    firstname: 'Scarlett',
    lastname: 'Johansson',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: false,
    lastMessage: 'You sent a photo.',
    time: '1h'
  }
]
interface ChatListProps {
  sidebarRef: React.RefObject<HTMLDivElement>
  showSidebar: boolean
  choosenChat: string | null
  setChoosenChat: React.Dispatch<React.SetStateAction<string | null>>
}
const ChatList: React.FC<ChatListProps> = ({ sidebarRef, showSidebar, setChoosenChat }) => {
  const [users, setUsers] = useState<IUserGet[]>([])
  const [chats, setChats] = useState<IChatGet[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChatsByUser()
        setChats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchChats()
  }, [])
  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-30 w-80 bg-white transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex-shrink-0 border-r border-gray-200`}
    >
      {/* Search Bar */}
      <div className='p-4'>
        <div className='relative'>
          <TextInput
            icon={HiSearch}
            placeholder='Search Messenger'
            className='bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* Stories */}
      <div className='px-4 mb-4'>
        <div className='flex space-x-2 overflow-x-auto pb-2'>
          <div className='flex flex-col items-center'>
            <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center'>
              <HiPlus className='w-6 h-6 text-gray-600' />
            </div>
            <span className='text-xs text-gray-600 mt-1'>Your Story</span>
          </div>
          {users.slice(0, 3).map((user) => (
            <div key={user._id} className='flex flex-col items-center'>
              <div className='w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center'>
                <Avatar img={''} rounded className='w-full h-full' />
              </div>
              <span className='text-xs text-gray-600 mt-1'>
                {user.firstname} {user.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className='overflow-y-auto h-[calc(100%-200px)] custom-scroll'>
        {chats.map((chat) => (
          <UserInChatList key={chat._id} chat={chat} onClick={() => setChoosenChat(chat._id)} />
        ))}
      </div>
      {/* Footer */}
      <div className='absolute h-[75px] bottom-0 w-full p-4 bg-white border-t border-gray-200'>
        <div>
          <p className='text-sm text-gray-500'>2024 All rights reserved.</p>
          <a href='https://facebook.com/whitedxk' target='_blank' className='text-sm text-blue-500'>
            Dang Xuan Khanh
          </a>
        </div>
      </div>
    </div>
  )
}

export default ChatList
