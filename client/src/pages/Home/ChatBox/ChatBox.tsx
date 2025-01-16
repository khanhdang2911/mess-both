import { TextInput, Button } from 'flowbite-react'
import { HiPlus, HiPhotograph, HiThumbUp } from 'react-icons/hi'
import { FaRegSmile } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import Message from '../../../components/Message/Message'
import ChatHeader from './ChatHeader/ChatHeader'
const MESSAGES = [
  {
    id: 1,
    content: 'Hey! How are you?',
    sender: 'user',
    timestamp: '3:04 PM',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  },
  {
    id: 2,
    content: 'Shall we go for Hiking this weekend?',
    sender: 'user',
    timestamp: '3:05 PM',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  },
  {
    id: 3,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
    sender: 'other',
    timestamp: '3:06 PM',
    avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  }
]
interface ChatBoxProps {
  sidebarRef: React.RefObject<HTMLDivElement>
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
}

const ChatBox: React.FC<ChatBoxProps> = ({ showSidebar, setShowSidebar }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState(MESSAGES)
  const onEmojiClick = (emojiObject: any) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji)
  }
  const sendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: '3:07 PM',
      avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
    }
    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
  }
  return (
    <div className='flex-1 flex flex-col w-full md:w-auto'>
      {/* Chat Header */}
      <ChatHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-white'>
        {messages.map((message, index) => (
          <Message key={index} message={message}/>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                  setInputMessage('')
                }
              }}
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
          <Button color='light' size='sm' pill className='flex'>
            <IoSend onClick={sendMessage} className='w-4 h-4' />
          </Button>
          <Button color='light' size='sm' pill>
            <HiThumbUp className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
