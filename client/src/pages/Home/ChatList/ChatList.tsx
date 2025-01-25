import { Avatar, TextInput } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import UserInChatList from '../../../components/UserInChatList/UserInChatList'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { getAllUsers, searchUser } from '../../../api/user.api'
import { createChat, getChatsByUser } from '../../../api/chat.api'
import { IChatCreate, IChatGet } from '../../../interfaces/Chat'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../../redux/selectors'
import Footer from '../../../layouts/Footer/Footer'
import { HomeContext } from '../../../context/HomeContext/HomeContext'
import { socket } from '../../../socket/socket'
import { changeStatusMessage } from '../../../api/message.api'
import useDebounce from '../../../hooks/useDebounce'
import { IUserGet } from '../../../interfaces/User'

interface ChatListProps {}
const ChatList: React.FC<ChatListProps> = ({}) => {
  const auth: any = useSelector(getAuthSelector)
  const homeContext = useContext(HomeContext)
  if (!homeContext) {
    return null
  }
  const {
    showSidebar,
    setChoosenChat,
    sidebarRef,
    setUsers,
    setChats,
    setUserIdCreateChat,
    userIdCreateChat,
    users,
    chats,
    setUsersOnline
  } = homeContext
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
  useEffect(() => {
    if (socket === null) return
    socket.emit('add-user-online', auth.user?._id)
    socket.on('users-online', (usersOnline) => {
      setUsersOnline(usersOnline)
    })
    return () => {
      socket.off('users-online')
    }
  }, [socket])
  // Search user area
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<IUserGet[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchUser(searchTerm)
        setSearchResults(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (searchTerm) {
      fetchSearchResults()
    }
  }, [debouncedSearchTerm])
  const handleSearchFocus = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value
    setSearchTerm(value)
    if (value.length > 0) {
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement)?.closest('.search-container')) {
      setShowSearchResults(false)
    }
  }
  const handleChooseChat = async (chat: IChatGet) => {
    setChoosenChat(chat._id)
    try {
      if (chat.last_message_id) {
        await changeStatusMessage(chat.last_message_id, chat._id)
        const getChats = await getChatsByUser()
        setChats(getChats.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
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
            value={searchTerm}
            onChange={(e) => handleSearchFocus(e)}
            icon={HiSearch}
            placeholder='Search CloudTalk '
            className='bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
      </div>
      {/* Search Results Dropdown */}
      {showSearchResults && searchTerm && (
        <div className='absolute left-0 right-0 mt-2 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[70%] overflow-y-auto z-50'>
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer'
                onClick={() => {
                  setUserIdCreateChat(user._id)
                  setShowSearchResults(false)
                  setSearchTerm('')
                }}
              >
                <Avatar img={user.avatar} rounded size='sm' />
                <div>
                  <div className='font-medium'>
                    {user.firstname} {user.lastname}
                  </div>
                  <div className='text-sm text-gray-500'>{user.email}</div>
                </div>
              </div>
            ))
          ) : (
            <div className='p-3 text-center text-gray-500'>No users found</div>
          )}
        </div>
      )}
      {/* Chat List */}
      <div className='overflow-y-auto h-[calc(100%-200px)] custom-scroll relative z-10'>
        {chats &&
          chats.map((chat) => <UserInChatList key={chat._id} chat={chat} onClick={() => handleChooseChat(chat)} />)}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ChatList
