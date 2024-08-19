import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import ManageLayout from '../layout/ManageLayout'
import QuestionLayout from '../layout/QuestionLayout'

import Home from '../pages/Home'
import Login from '../pages/login'
import Register from '../pages/register'
import NotFound from '../pages/NotFound'

import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Test from '../pages/manage/Test'

// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载，拆分，优化首页体积
const Edit = lazy(
  () =>
    import(
      /* webpackChunkName: "editPage"*/ '../pages/question/Edit'
    )
)
const Stat = lazy(
  () =>
    import(
      /* webpackChunkName: "statPage"*/ '../pages/question/Stat'
    )
)

const routes = [
  {
    path: '/',
    element: <MainLayout />, // 模板
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />, // 模板
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
          {
            path: 'test',
            element: <Test />,
          },
        ],
      },
      {
        path: '*', // 404 路由匹配，都写在最后（兜底）
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />, // 模板
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

// 登录后，不可访问登录、注册
export function isLoginOrRegister(pathname: string) {
  if (['/login', '/register'].includes(pathname))
    return true
  return false
}

// 未登录，可以访问
export function isNoNeeUserInfo(pathname: string) {
  if (['/home', '/login', 'register'].includes(pathname))
    return true
  return false
}
