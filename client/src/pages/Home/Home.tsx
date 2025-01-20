'use client'

import ChatList from './ChatList/ChatList'
import ChatBox from './ChatBox/ChatBox'
import { HomeProvider } from '../../context/HomeContext/HomeContext'

export default function Home() {
  return (
    <HomeProvider>
      <div className='flex h-screen bg-white'>
        {/* Left Sidebar - User Chat List */}
        <ChatList />
        {/* Right Side - Chat Area */}
        <ChatBox />
      </div>
    </HomeProvider>
  )
}
