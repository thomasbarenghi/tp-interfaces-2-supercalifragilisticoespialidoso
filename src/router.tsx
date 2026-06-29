import { createBrowserRouter } from 'react-router'
import AppLayout from './layouts/AppLayout'
import Contact from './pages/contact'
import Feed from './pages/feed'
import PostDetail from './pages/post-detail'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import ProtectedRoute from './hocs/withAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
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
