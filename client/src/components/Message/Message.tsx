import { Avatar } from 'flowbite-react'

interface MessageProps {
  message: {
    id: number
    sender: string
    content: string
    timestamp: string
    avatar?: string
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user'

  return (
    <div key={message.id} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <Avatar img={message.avatar} rounded />}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className='text-sm'>{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</p>
      </div>
    </div>
  )
}

export default Message
