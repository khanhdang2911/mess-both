import { ReactNode } from 'react'
import Header from '../Header/Header'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full'>
      <Header />

      {children}
    </div>
  )
}

export default DefaultLayout
