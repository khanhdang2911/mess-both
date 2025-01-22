'use client'

import ChatList from './ChatList/ChatList'
import ChatBox from './ChatBox/ChatBox'
import { HomeProvider } from '../../context/HomeContext/HomeContext'
import { useEffect } from 'react'
import { socketChat, socketUser } from '../../socket/socket'

export default function Home() {
  useEffect(() => {
    socketChat.connect()
    socketUser.connect()
    return () => {
      socketChat.disconnect()
      socketUser.disconnect()
    }
  }, [])
  return (
    <HomeProvider>
      <div className='flex h-[91vh] bg-white'>
        {/* Left Sidebar - User Chat List */}
        <ChatList />
        {/* Right Side - Chat Area */}
        <ChatBox />
      </div>
    </HomeProvider>
  )
}
