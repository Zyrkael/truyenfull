import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteLayout } from './layout/SiteLayout'
import { HomePage } from './pages/Home'
import { CategoryPage } from './pages/Category'
import { NovelDetailPage } from './pages/NovelDetail'
import { ChapterReadPage } from './pages/ChapterRead'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="the-loai/:slug" element={<CategoryPage />} />
        <Route path=":novelSlug/chuong/:chapterNum" element={<ChapterReadPage />} />
        <Route path=":novelSlug" element={<NovelDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
