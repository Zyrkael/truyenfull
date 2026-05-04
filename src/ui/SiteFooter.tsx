import { BookOpen, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Tiên Hiệp', to: '/the-loai/tien-hiep' },
  { label: 'Kiếm Hiệp', to: '/the-loai/kiem-hiep' },
  { label: 'Ngôn Tình', to: '/the-loai/ngon-tinh' },
  { label: 'Truyện Full', to: '#' },
  { label: 'Truyện Hot', to: '#' },
]

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <Link to="/" className="logo footer-logo" aria-label="Trang chủ">
            <BookOpen className="logo-icon" size={22} strokeWidth={2.5} />
            <span className="tf-logo-text">TRUYỆN FULL</span>
          </Link>
          <p className="footer-desc">
            Đọc truyện online, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục.
            Hỗ trợ mọi thiết bị — máy tính, điện thoại, máy tính bảng.
          </p>
          <div className="footer-links">
            {QUICK_LINKS.map(l => (
              <Link key={l.label} to={l.to} className="footer-link">{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TruyenFull.</span>
          <span className="footer-made">Made with <Heart size={12} style={{ display:'inline', verticalAlign:'middle', color:'#e85d4a' }} /> for readers</span>
        </div>
      </div>
    </footer>
  )
}
