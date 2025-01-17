'use client'

import React, { useState } from 'react'
import { Card, TextInput, Label, Button, Alert, Radio } from 'flowbite-react'
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { register } from '../../api/auth.api'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstname || !lastname || !email || !password || !gender) {
      setError('Please fill in all fields')
      return
    }
    // Implement registration logic here
    try {
      const response = await register({ firstname, lastname, email, password, gender })
      if (response.status === 'success') {
        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setGender('')
        navigate('/login')
      }
    } catch (error) {
      setError((error as any)?.response?.data.message)
    }
  }

  const handleGoogleRegister = () => {
    // Implement Google registration logic here
    console.log('Google registration attempt')
  }

  const handleFacebookRegister = () => {
    // Implement Facebook registration logic here
    console.log('Facebook registration attempt')
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-[90%] sm:max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>Create an Account</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='firstname' value='First Name' className='text-sm font-medium text-gray-700' />
              <TextInput
                id='firstname'
                type='text'
                icon={HiUser}
                placeholder='John'
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='mt-1'
              />
            </div>
            <div>
              <Label htmlFor='lastname' value='Last Name' className='text-sm font-medium text-gray-700' />
              <TextInput
                id='lastname'
                type='text'
                icon={HiUser}
                placeholder='Doe'
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='mt-1'
              />
            </div>
          </div>
          <div>
            <Label htmlFor='email' value='Email' className='text-sm font-medium text-gray-700' />
            <TextInput
              id='email'
              type='email'
              icon={HiMail}
              placeholder='name@example.com'
              required
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1'
            />
          </div>
          <div>
            <Label value='Gender' className='text-sm font-medium text-gray-700 mb-2 block' />
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <Radio
                  id='Male'
                  name='gender'
                  value='Male'
                  onChange={() => setGender('Male')}
                  checked={gender === 'Male'}
                  className='text-blue-500 border-blue-500 focus:ring-blue-500'
                />
                <Label htmlFor='Male' className='ml-2'>
                  Male
                </Label>
              </div>
              <div className='flex items-center'>
                <Radio
                  id='Female'
                  name='gender'
                  value='Female'
                  onChange={() => setGender('Female')}
                  checked={gender === 'Female'}
                  className='text-blue-500 border-blue-500 focus:ring-blue-500'
                />
                <Label htmlFor='Female' className='ml-2'>
                  Female
                </Label>
              </div>
            </div>
          </div>
          <Button color='blue' type='submit' className='w-full'>
            Sign Up
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
              <span className='px-2 bg-white text-gray-500'>Or sign up with</span>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-2 gap-3'>
            <Button color='light' onClick={handleGoogleRegister} className='w-full flex items-center justify-center'>
              <FaGoogle className='mr-2 mt-1' />
              <span>Google</span>
            </Button>
            <Button color='light' onClick={handleFacebookRegister} className='w-full flex items-center justify-center'>
              <FaFacebook className='mr-2 mt-1' />
              Facebook
            </Button>
          </div>
        </div>
        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?
          <Link to='/login' className='font-medium text-blue-600 hover:underline'>
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
