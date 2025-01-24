import { Avatar, Button } from 'flowbite-react'
import { useContext } from 'react'
import { HiMenu } from 'react-icons/hi'
import { HomeContext } from '../../../../context/HomeContext/HomeContext'
import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../../../redux/selectors'

const ChatHeader = () => {
  const context = useContext(HomeContext)
  const auth: any = useSelector(getAuthSelector)

  if (!context) {
    throw new Error('HomeContext must be used within a HomeProvider')
  }
  const { chatCurrentInfo, showSidebar, setShowSidebar, usersOnline } = context
  const otherUserId = chatCurrentInfo?.members.find((member: string) => member !== auth.user._id)
  const checkUserIsOnline = usersOnline.some((user) => user.userId === otherUserId)

  return (
    <div className='flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white'>
      <Button color='light' size='sm' className='mr-2 md:hidden' onClick={() => setShowSidebar(!showSidebar)}>
        <HiMenu className='w-5 h-5' />
      </Button>
      <div className='flex items-center'>
        <Avatar img={chatCurrentInfo?.chat_avatar} rounded size='md' />
        <div className='ml-3'>
          <p className='text-sm font-medium text-gray-900'>{chatCurrentInfo?.chat_name}</p>
          <p className='text-xs text-gray-500'>{checkUserIsOnline ? 'Online' : 'Offline'}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
