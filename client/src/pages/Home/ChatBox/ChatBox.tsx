import { TextInput, Button } from 'flowbite-react'
import { HiPlus, HiPhotograph, HiThumbUp } from 'react-icons/hi'
import { FaRegSmile } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Message from '../../../components/Message/Message'
import ChatHeader from './ChatHeader/ChatHeader'
import { IMessageCreate } from '../../../interfaces/Message'
import { createMessage } from '../../../api/message.api'
import { HomeContext } from '../../../context/HomeContext/HomeContext'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../../redux/selectors'
import { socketChat } from '../../../socket/socket'

const ChatBox = () => {
  const auth: any = useSelector(getAuthSelector)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('HomeContext must be used within a HomeProvider')
  }
  const { chatCurrentInfo, messages, setMessages } = context
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
      const dataResponse = response.data
      if (response.status === 'success') {
        setMessages((prev) => [...prev, dataResponse])
        socketChat.emit('send-message', dataResponse)
      }
    } catch (error) {
      console.log(error)
    }

    setInputMessage('')
  }
  useLayoutEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [messages])
  // connect socket
  useEffect(() => {
    if (socketChat && chatCurrentInfo) {
      socketChat.emit('join-room', {
        chatId: chatCurrentInfo._id,
        userId: auth.user?._id
      })
      socketChat.on('receive-message', (message) => {
        if (message.chat_id === chatCurrentInfo._id && message.sender_id !== auth.user?._id) {
          setMessages((prev) => [...prev, message])
        }
      })
    }
    return () => {
      if (socketChat && chatCurrentInfo) {
        socketChat.emit('leave-room', {
          chatId: chatCurrentInfo._id,
          userId: auth.user?._id
        })
        socketChat.off('receive-message')
      }
    }
  }, [chatCurrentInfo, socketChat])
  return (
    <div className='flex-1 flex flex-col w-full md:w-auto'>
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-white'>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messageEndRef}></div>
      </div>

      {/* Message Input */}
      <div className='h-[60px] p-2 border-t border-gray-200 bg-white relative'>
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
