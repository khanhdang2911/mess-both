import { Avatar, Button } from 'flowbite-react'
import { useContext } from 'react'
import { HiMenu } from 'react-icons/hi'
import { HomeContext } from '../../../../context/HomeContext/HomeContext'

const ChatHeader = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('HomeContext must be used within a HomeProvider')
  }
  const { chatCurrentInfo, showSidebar, setShowSidebar } = context
  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
      <Button color='light' size='sm' className='mr-2 md:hidden' onClick={() => setShowSidebar(!showSidebar)}>
        <HiMenu className='w-5 h-5' />
      </Button>
      <div className='flex items-center'>
        <Avatar img={chatCurrentInfo?.chat_avatar} rounded size='md' />
        <div className='ml-3'>
          <p className='text-sm font-medium text-gray-900'>{chatCurrentInfo?.chat_name}</p>
          <p className='text-xs text-gray-500'>Active 1h ago</p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
