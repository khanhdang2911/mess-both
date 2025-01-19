import { Button, Avatar, Dropdown } from 'flowbite-react'
import { FaFacebookMessenger, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthSelector } from '../../redux/selectors'
import { logout } from '../../api/auth.api'
import authSlice from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const auth: any = useSelector(getAuthSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await logout()
      dispatch(authSlice.actions.logout())
      navigate('/login')
    } catch (error) {
      console.log('error', error)
      dispatch(authSlice.actions.logout())
      navigate('/login')
    }
  }
  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link className='flex items-center text-blue-500' to='/'>
          <FaFacebookMessenger className='h-8 w-8 mr-2' />
          <span className='text-xl font-semibold'>Messenger</span>
        </Link>

        <div className='flex items-center gap-4'>
          {auth?.isAuthenticated ? (
            <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img={auth.user?.avatar} rounded />}>
              <Dropdown.Header>
                <span className='block text-sm'>
                  {auth.user.firstname} {auth.user.lastname}
                </span>
                <span className='block truncate text-sm font-medium'>{auth.user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item icon={FaUserCircle}>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={FaSignOutAlt} onClick={handleLogout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className='flex gap-4'>
              <Link to='/login'>
                <Button color='blue'>Login</Button>
              </Link>
              <Link to='/register' className='block'>
                <Button color='light'>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
