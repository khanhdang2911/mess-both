import { Avatar, TextInput } from 'flowbite-react'
import { HiSearch, HiPlus } from 'react-icons/hi'
import UserInChatList from '../../../components/UserInChatList/UserInChatList'
import { useContext, useEffect, useState } from 'react'
import { IUserGet } from '../../../interfaces/User'
import { getAllUsers } from '../../../api/user.api'
import { createChat, getChatsByUser } from '../../../api/chat.api'
import { IChatCreate, IChatGet } from '../../../interfaces/Chat'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../../redux/selectors'
import Footer from '../../../layouts/Footer/Footer'
import { HomeContext } from '../../../context/HomeContext/HomeContext'

interface ChatListProps {}
const ChatList: React.FC<ChatListProps> = ({}) => {
  const [users, setUsers] = useState<IUserGet[]>([])
  const [chats, setChats] = useState<IChatGet[]>([])
  const [userIdCreateChat, setUserIdCreateChat] = useState<string | null>(null)
  const auth: any = useSelector(getAuthSelector)
  const homeContext = useContext(HomeContext)
  if (!homeContext) {
    return null
  }
  const { showSidebar, setChoosenChat, sidebarRef } = homeContext
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
        setChoosenChat(response.data[0]._id)
      } catch (error) {
        console.log(error)
      }
    }
    fetchChats()
  }, [])

  useEffect(() => {
    const handleCreateChat = async () => {
      try {
        const chatCreate: IChatCreate = {
          members: [userIdCreateChat, auth.user?._id],
          chat_type: 'direct'
        }
        const response = await createChat(chatCreate)
        setChats([...chats, response.data])
      } catch (error) {
        console.log(error)
      }
    }
    if (userIdCreateChat) {
      handleCreateChat()
    }
  }, [userIdCreateChat])
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
            <div onClick={() => setUserIdCreateChat(user._id)} key={user._id} className='flex flex-col items-center'>
              <div className='w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center'>
                <Avatar img={user.avatar} rounded className='w-full h-full' />
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
        {chats &&
          chats.map((chat) => <UserInChatList key={chat._id} chat={chat} onClick={() => setChoosenChat(chat._id)} />)}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ChatList
