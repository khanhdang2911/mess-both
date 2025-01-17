import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes/routes'
import React from 'react'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = route.layout
            let Component = route.component
            if (Component === null) {
              Component = React.Fragment
            }
            if (Layout === null) {
              Layout = React.Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            )
          })}
          {
            // Add private routes
            privateRoutes.map((route, index) => {
              let Layout = route.layout
              let Component = route.component
              if (Component === null) {
                Component = React.Fragment
              }
              if (!Layout) {
                Layout = React.Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Component />
                      </Layout>
                    </PrivateRoute>
                  }
                />
              )
            })
          }
        </Routes>
      </Router>
    </>
  )
}

export default App
