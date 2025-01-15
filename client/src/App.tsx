import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import Register from './pages/Register/Register'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path='/login'
            element={
              <DefaultLayout>
                <Login />
              </DefaultLayout>
            }
          />
          <Route
            path='/register'
            element={
              <DefaultLayout>
                <Register />
              </DefaultLayout>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
