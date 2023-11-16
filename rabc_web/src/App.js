import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, HashRouter as Router } from 'react-router-dom'
import User from './Components/User'
import Role from './Components/Role'
import Authorize from './Components/Authorize'
import WelcomMenu from './WelcomMenu'
import Login from './Components/Login'
import NotFoundPage from './Components/NotFoundPage'

const App = () => {

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