'use client'

import { useState, useEffect, useRef } from 'react'
import ChatList from './ChatList/ChatList'
import ChatBox from './ChatBox/ChatBox'

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false)
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

  return (
    <div className='flex h-screen bg-white'>
      {/* Left Sidebar - User Chat List */}
      <ChatList showSidebar={showSidebar} sidebarRef={sidebarRef} />
      {/* Right Side - Chat Area */}
      <ChatBox setShowSidebar={setShowSidebar} showSidebar={showSidebar} sidebarRef={sidebarRef} />
    </div>
  )
}
