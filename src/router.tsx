import { createBrowserRouter } from 'react-router'
import AppLayout from './layouts/AppLayout'
import LoginRegisterLayout from './layouts/LoginRegisterLayout'
import Contact from './pages/contact'
import Feed from './pages/feed'
import PostDetail from './pages/post-detail'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import ProtectedRoute from './hocs/withAuth'

export const router = createBrowserRouter([
  {
    element: <LoginRegisterLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Feed /> },
          { path: 'contact', element: <Contact /> },
          { path: 'post/:id', element: <PostDetail /> },
          { path: 'profile', element: <Profile /> },
          { path: 'profile/:id', element: <Profile /> },
        ],
      },
    ],
  },
])
