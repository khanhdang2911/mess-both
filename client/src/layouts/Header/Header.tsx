import { Button, Avatar, Dropdown } from 'flowbite-react'
import { FaFacebookMessenger, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  // This state would normally be managed by your authentication system
  const isLoggedIn = false // Set this to true to see the avatar and dropdown

  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link className='flex items-center text-blue-500' to='/'>
          <FaFacebookMessenger className='h-8 w-8 mr-2' />
          <span className='text-xl font-semibold'>Messenger</span>
        </Link>

        <div className='flex items-center gap-4'>
          {true ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='User settings'
                  img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className='block text-sm'>Bonnie Green</span>
                <span className='block truncate text-sm font-medium'>name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item icon={FaUserCircle}>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={FaSignOutAlt}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className='sm:flex sm:gap-4'>
              <Button color='blue' href='#'>
                Login
              </Button>
              <Button color='light' className='hidden sm:block' href='#'>
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
