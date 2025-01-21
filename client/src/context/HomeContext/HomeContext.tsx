import { createContext, useState, useRef, useEffect } from 'react'
import { getMessagesByChat } from '../../api/message.api'
import { getChatById } from '../../api/chat.api'
import { IMessageResponse } from '../../interfaces/Message'
import { IUserGet } from '../../interfaces/User'
import { IChatGet } from '../../interfaces/Chat'

interface HomeContextType {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  choosenChat: string | null
  setChoosenChat: React.Dispatch<React.SetStateAction<string | null>>
  chatCurrentInfo: any
  setChatCurrentInfo: React.Dispatch<React.SetStateAction<any>>
  messages: IMessageResponse[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
  sidebarRef: React.RefObject<HTMLDivElement>
  users: IUserGet[]
  setUsers: React.Dispatch<React.SetStateAction<IUserGet[]>>
  chats: IChatGet[]
  setChats: React.Dispatch<React.SetStateAction<IChatGet[]>>
  userIdCreateChat: string | null
  setUserIdCreateChat: React.Dispatch<React.SetStateAction<string | null>>
  usersOnline: any[]
  setUsersOnline: React.Dispatch<React.SetStateAction<any[]>>
}

export const HomeContext = createContext<HomeContextType | null>(null)

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [choosenChat, setChoosenChat] = useState<string | null>(null) //id of the chat
  const [chatCurrentInfo, setChatCurrentInfo] = useState<any>(null)
  const [messages, setMessages] = useState<IMessageResponse[]>([])
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState<IUserGet[]>([])
  const [chats, setChats] = useState<IChatGet[]>([])
  const [userIdCreateChat, setUserIdCreateChat] = useState<string | null>(null)
  const [usersOnline, setUsersOnline] = useState<any[]>([])
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessagesByChat(choosenChat!)
        setMessages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (choosenChat) {
      fetchMessages()
    }
  }, [choosenChat])
  useEffect(() => {
    const fetchChatInfo = async () => {
      try {
        const response = await getChatById(choosenChat!)
        setChatCurrentInfo(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (choosenChat) {
      fetchChatInfo()
    }
  }, [choosenChat])

  return (
    <HomeContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        choosenChat,
        setChoosenChat,
        chatCurrentInfo,
        setChatCurrentInfo,
        messages,
        setMessages,
        sidebarRef,
        users,
        setUsers,
        chats,
        setChats,
        userIdCreateChat,
        setUserIdCreateChat,
        usersOnline,
        setUsersOnline
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
