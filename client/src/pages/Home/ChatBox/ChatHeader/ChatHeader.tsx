import { Avatar, Button } from "flowbite-react"
import { HiMenu } from 'react-icons/hi';

interface ChatHeaderProps {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
}
const ChatHeader: React.FC<ChatHeaderProps> = ({  showSidebar, setShowSidebar }) => {
  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
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
  )
}

export default ChatHeader
