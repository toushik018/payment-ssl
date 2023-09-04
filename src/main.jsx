import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Main from './components/Layout/Main';
import Checkout from './components/Home/Checkout';
import PaymentSuccess from './components/pages/PaymentSuccess';
import PaymentFail from './components/pages/PaymentFail';
import AllBlog from './Blog/AllBlog';
import AddBlogForm from './Blog/AddBlog';
import BlogDetails from './Blog/BlogDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/checkout/:id',
        element: <Checkout></Checkout>
      },
      {
        path: 'payment/success/:tranId',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: 'payment/fail/:tranId',
        element: <PaymentFail></PaymentFail>
      },
      {
        path:'allBlog',
        element: <AllBlog></AllBlog>
      },
      {
        path: 'addBlog',
        element: <AddBlogForm></AddBlogForm>
      },
      {
        path: '/blog/:id',
        element: <BlogDetails></BlogDetails>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
