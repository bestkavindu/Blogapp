import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import AuthorsPost from './pages/AuthorPost'
import CategoryPost from './pages/CategoryPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import Logout from './pages/Logout'
import AuthorPost from './pages/AuthorPost';
import Authors from './pages/Authors';
import Dashboard from './pages/Dashboard';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children:[
      {index: true, element: <Home/>},
      {path: "posts/:id", element: <PostDetail/>},
      {path: "posts/users/:id", element: <AuthorPost/>},
      {path: "posts/categories/:id", element: <CategoryPost/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <UserProfile/>},
      {path: "authors", element: <Authors/>},
      {path: "authors/:id", element: <AuthorsPost/>},
      {path: "create", element: <CreatePost/>},
      {path: "posts/:id/edit", element: <EditPost/>},
      {path: "posts/:id/delete", element: <DeletePost/>},
      {path: "Logout", element: <Logout/>},
      {path: "mypost/:id", element: <Dashboard/>},
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

