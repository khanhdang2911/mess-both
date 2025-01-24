'use client'

import ChatList from './ChatList/ChatList'
import ChatBox from './ChatBox/ChatBox'
import { HomeProvider } from '../../context/HomeContext/HomeContext'
import { useEffect } from 'react'
import { socket } from '../../socket/socket'

export default function Home() {
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <HomeProvider>
      <div className='flex h-[91vh] bg-white'>
        <ChatList />
        <ChatBox />
      </div>
    </HomeProvider>
  )
}
