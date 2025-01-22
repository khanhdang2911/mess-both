'use client'

import React, { useState } from 'react'
import { Card, TextInput, Label, Button, Alert, Checkbox } from 'flowbite-react'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import authSlice from '../../redux/authSlice'
import { login } from '../../api/auth.api'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    try {
      const response = await login({ email, password })
      if (response.status == 'success') {
        dispatch(authSlice.actions.setUser(response.data))
      }
      //navigate('/')
      navigate('/')
    } catch (error) {
      setError((error as any)?.response?.data.message)
    }
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login attempt')
  }

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
    console.log('Facebook login attempt')
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-[90%] sm:max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>Welcome Back CloudTalk </h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label htmlFor='email' value='Email' className='text-sm font-medium text-gray-700' />
            <TextInput
              id='email'
              type='email'
              icon={HiMail}
              placeholder='name@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1'
            />
          </div>
          <div>
            <Label htmlFor='password' value='Password' className='text-sm font-medium text-gray-700' />
            <TextInput
              id='password'
              type='password'
              icon={HiLockClosed}
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1'
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Checkbox id='remember' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <Label htmlFor='remember' className='ml-2 text-sm text-gray-600'>
                Remember me
              </Label>
            </div>
            <a href='#' className='text-sm text-blue-600 hover:underline'>
              Forgot password?
            </a>
          </div>
          <Button color='blue' type='submit' className='w-full'>
            Sign In
          </Button>
        </form>
        {error && (
          <Alert color='failure' className='mt-4'>
            {error}
          </Alert>
        )}
        <div className='mt-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>Or continue with</span>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-2 gap-3'>
            <Button color='light' onClick={handleGoogleLogin} className='w-full flex items-center justify-center'>
              <FaGoogle className='mr-2 mt-1' />
              Google
            </Button>
            <Button color='light' onClick={handleFacebookLogin} className='w-full flex items-center justify-center'>
              <FaFacebook className='mr-2 mt-1' />
              Facebook
            </Button>
          </div>
        </div>
        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?
          <Link to='/register' className='font-medium text-blue-600 hover:underline'>
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}
