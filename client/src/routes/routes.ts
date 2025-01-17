import routes from '../config/routes'
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
interface IRoute {
  path: string
  component: any
  layout: any
}
const publicRoutes: IRoute[] = [
  {
    path: routes.login,
    component: Login,
    layout: null
  },
  {
    path: routes.register,
    component: Register,
    layout: null
  },
  {
    path: routes.notFound,
    component: null,
    layout: null
  }
]
const privateRoutes: IRoute[] = [
  {
    path: routes.home,
    component: Home,
    layout: DefaultLayout
  }
]

export { publicRoutes, privateRoutes }
