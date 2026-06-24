import { createBrowserRouter } from 'react-router'
import AppLayout from './layouts/AppLayout'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Error from './pages/error'
import Home from './pages/home'
import List from './pages/list'
import OrderSearch from './pages/order-search'
import OrderTracking from './pages/order-tracking'
import ProductDetail from './pages/product-detail'
import Success from './pages/success'
import Contact from './pages/contact'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'list', element: <List /> },
      { path: 'product/:slug', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'checkout/success', element: <Success /> },
      { path: 'checkout/error', element: <Error /> },
      { path: 'tracking', element: <OrderSearch /> },
      { path: 'tracking/:orderNumber', element: <OrderTracking /> },
    ],
  },
])
