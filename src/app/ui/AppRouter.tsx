import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from 'features/login/ui/Login'
import TodolistList from 'features/todolistList/ui/TodolistList'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<TodolistList />} />
      <Route path="login" element={<Login />} />
      ​<Route path="404" element={<h1>404: PAGE NOT FOUND</h1>} />
      ​<Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default AppRouter
