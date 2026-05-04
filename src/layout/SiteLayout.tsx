import { Outlet } from 'react-router-dom'
import { SiteHeader } from '../ui/SiteHeader'
import { SiteFooter } from '../ui/SiteFooter'

export function SiteLayout() {
  return (
    <div className="app-container">
      <SiteHeader />
      <main className="main-content animate-fade-in">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}


