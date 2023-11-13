import React, { useEffect, useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, theme, message } from 'antd'
import { BrowserRouter, Routes, Route, Link, Navigate, HashRouter as Router } from 'react-router-dom'
import User from './Components/User'
import Role from './Components/Role'
import Authorize from './Components/Authorize'
import WelcomMenu from './WelcomMenu'
import Login from './Components/Login'
import NotFoundPage from './Components/NotFoundPage'
const { Header, Content, Footer, Sider } = Layout
const App = () => {
  const [nowlocation, setnowlocation] = useState(['系统管理', '用户管理'])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const items1 = ['用户管理', '角色管理', '权限管理']
  const linklist = ['/user', '/role', '/authorize']
  const menus = ['系统管理', '基础设施', '支付管理']

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1)
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: menus[index],
      children: new Array(3).fill(null).map((_, j) => {
        const subKey = index * 3 + j + 1
        return {
          key: subKey,
          label: <Link
            to={linklist[j]}
            style={{
              margin: 0
            }}
            onClick={() => {
              const clickedItem = menus[index]
              const clickedSubItem = items1[j]
              setnowlocation([clickedItem, clickedSubItem])
            }}>
            <p>{items1[j]}</p>
          </Link>,

        }
      }),

    }
  })

  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/welcome" element={<WelcomMenu />}>
          <Route path="/welcome/user" element={<User />}></Route>
          <Route path="/welcome/role" element={<Role />}></Route>
          <Route path="/welcome/authorize" element={<Authorize />}></Route>
        </Route>
        <Route element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App