import { TextInput, Button } from 'flowbite-react'
import { HiPlus, HiPhotograph, HiThumbUp } from 'react-icons/hi'
import { FaRegSmile } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import Message from '../../../components/Message/Message'
import ChatHeader from './ChatHeader/ChatHeader'
import { IChatGet } from '../../../interfaces/Chat'
import { IMessageCreate } from '../../../interfaces/Message'
import { createMessage } from '../../../api/message.api'

interface ChatBoxProps {
  sidebarRef: React.RefObject<HTMLDivElement>
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  messages: any[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
  chatCurrentInfo: IChatGet
}

const ChatBox: React.FC<ChatBoxProps> = ({ showSidebar, setShowSidebar, messages, setMessages, chatCurrentInfo }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const onEmojiClick = (emojiObject: any) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji)
  }
  const sendMessage = async () => {
    const newMessage: IMessageCreate = {
      chat_id: chatCurrentInfo._id,
      content: inputMessage,
      type: 'text'
    }
    try {
      const response = await createMessage(newMessage)
      if (response.status === 'success') {
        setMessages((prev) => [...prev, response.data])
      }
    } catch (error) {
      console.log(error)
    }

    setInputMessage('')
  }
  return (
    <div className='flex-1 flex flex-col w-full md:w-auto'>
      {/* Chat Header */}
      <ChatHeader chatCurrentInfo={chatCurrentInfo} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-white'>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
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
          <Button onClick={sendMessage} color='light' size='sm' pill className='flex'>
            <IoSend className='w-4 h-4' />
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
