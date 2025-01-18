'use client'

import { useState, useEffect, useRef } from 'react'
import ChatList from './ChatList/ChatList'
import ChatBox from './ChatBox/ChatBox'
import { getMessagesByChat } from '../../api/message.api'

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [choosenChat, setChoosenChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const sidebarRef = useRef<HTMLDivElement>(null)

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
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (choosenChat) {
      fetchMessages()
    }
  }, [choosenChat])
  return (
    <div className='flex h-screen bg-white'>
      {/* Left Sidebar - User Chat List */}
      <ChatList
        showSidebar={showSidebar}
        sidebarRef={sidebarRef}
        choosenChat={choosenChat}
        setChoosenChat={setChoosenChat}
      />
      {/* Right Side - Chat Area */}
      <ChatBox
        messages={messages}
        setMessages={setMessages}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        sidebarRef={sidebarRef}
      />
    </div>
  )
}
