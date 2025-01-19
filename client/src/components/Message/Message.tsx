import { Avatar } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../redux/selectors'
import moment from 'moment'
interface MessageProps {
  message: any
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isToday = moment(message.createdAt).isSame(new Date(), 'day')
  const auth: any = useSelector(getAuthSelector)
  const isUser = auth?.user && auth?.user._id === message?.sender_id

  return (
    <div key={message.id} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <Avatar img={message.avatar} rounded />}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className='text-sm'>{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {isToday ? moment(message.createdAt).format('LT') : moment(message.createdAt).format('LLL')}
        </p>
      </div>
    </div>
  )
}

export default Message
