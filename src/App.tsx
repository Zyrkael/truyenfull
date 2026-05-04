import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteLayout } from './layout/SiteLayout'
import { HomePage } from './pages/Home'
import { CategoryPage } from './pages/Category'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="the-loai/:slug" element={<CategoryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
