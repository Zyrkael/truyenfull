import { BookOpen } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="logo" style={{ justifyContent: 'center' }}>
          <BookOpen className="logo-icon" size={24} />
          <span className="text-gradient">TruyenFull</span>
        </div>
        <p>
          Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục. Hỗ trợ mọi
          thiết bị như di động và máy tính bảng.
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>© 2026 TruyenFull.</div>
      </div>
    </footer>
  )
}

