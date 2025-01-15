'use client'

import { useState, useEffect, useRef } from 'react'
import { Avatar, TextInput, Button } from 'flowbite-react'
import { HiSearch, HiPlus, HiPhotograph, HiMicrophone, HiThumbUp, HiMenu } from 'react-icons/hi'
import { FaRegSmile } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react'

const users = [
  {
    id: 1,
    name: 'Anna',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'See you tomorrow!',
    time: '2m'
  },
  {
    id: 2,
    name: 'Jeff',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'Great idea!',
    time: '1h'
  },
  {
    id: 3,
    name: 'Tony Stark',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: true,
    lastMessage: 'Hey, Are you there?',
    time: '10min'
  },
  {
    id: 4,
    name: 'Scarlett Johansson',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    isOnline: false,
    lastMessage: 'You sent a photo.',
    time: '1h'
  }
]

const messages = [
  {
    id: 1,
    content: 'Hey! How are you?',
    sender: 'user',
    timestamp: '3:04 PM'
  },
  {
    id: 2,
    content: 'Shall we go for Hiking this weekend?',
    sender: 'user',
    timestamp: '3:05 PM'
  },
  {
    id: 3,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
    sender: 'other',
    timestamp: '3:06 PM'
  }
]

export default function Home() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && sidebarRef.current.contains(e.target as Node)) {
        return
      }
      setShowSidebar(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
  const onEmojiClick = (emojiObject: any) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji)
  }

  return (
    <div className='flex h-screen bg-white'>
      {/* Left Sidebar - User Chat List */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-80 bg-white transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex-shrink-0 border-r border-gray-200`}
      >
        {/* Search Bar */}
        <div className='p-4'>
          <div className='relative'>
            <TextInput icon={HiSearch} placeholder='Search Messenger' className='bg-gray-50 border-gray-200' />
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
              <div key={user.id} className='flex flex-col items-center'>
                <div className='w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center'>
                  <Avatar img={user.avatar} rounded className='w-full h-full' />
                </div>
                <span className='text-xs text-gray-600 mt-1'>{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className='overflow-y-auto h-[calc(100%-200px)]'>
          {users.map((user) => (
            <div key={user.id} className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer'>
              <div className='relative'>
                <Avatar img={user.avatar} rounded />
                {user.isOnline && (
                  <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between'>
                  <p className='text-sm font-medium text-gray-900 truncate'>{user.name}</p>
                  <span className='text-xs text-gray-500'>{user.time}</span>
                </div>
                <p className='text-sm text-gray-500 truncate'>{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='absolute h-[75px] bottom-0 w-full p-4 bg-white border-t border-gray-200'>
          <div>
            <p className='text-sm text-gray-500'>2024 All rights reserved.</p>
            <a href='https://facebook.com/whitedxk' target='_blank' className='text-sm text-blue-500'>
              Dang Xuan Khanh
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className='flex-1 flex flex-col w-full md:w-auto'>
        {/* Chat Header */}
        <div ref={sidebarRef} className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
          <Button color='light' size='sm' className='mr-2 md:hidden' onClick={() => setShowSidebar(!showSidebar)}>
            <HiMenu className='w-5 h-5' />
          </Button>
          <div className='flex items-center'>
            <Avatar img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded size='md' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-900'>Scarlett Johansson</p>
              <p className='text-xs text-gray-500'>Active 1h ago</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-white'>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className='text-sm'>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className='h-[75px] p-4 border-t border-gray-200 bg-white relative'>
          <div className='flex items-center gap-2'>
            <Button color='light' size='sm' pill className='hidden sm:flex'>
              <HiPlus className='w-4 h-4' />
            </Button>
            <Button color='light' size='sm' pill>
              <HiPhotograph className='w-4 h-4' />
            </Button>
            <div className='flex-1 relative'>
              <TextInput
                className='w-full bg-gray-50 border-gray-200'
                placeholder='Aa'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button
                color='light'
                size='sm'
                className='absolute right-2 top-1/2 -translate-y-1/2'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaRegSmile className='w-4 h-4 text-gray-500' />
              </Button>
              {showEmojiPicker && (
                <div className='absolute bottom-full right-0 mb-2'>
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <Button color='light' size='sm' pill className='hidden sm:flex'>
              <HiMicrophone className='w-4 h-4' />
            </Button>
            <Button color='light' size='sm' pill>
              <HiThumbUp className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
