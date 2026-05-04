import { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORY_LINKS } from '../data/mock'
import { applyTheme, getInitialTheme, type Theme } from '../lib/theme'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => 'light')
  const [openMega, setOpenMega] = useState<'danh-sach' | 'phan-loai' | null>(null)
  const [searchVal, setSearchVal] = useState('')
  const themeBtnRef = useRef<HTMLButtonElement | null>(null)
  const megaCloseTimer = useRef<number | null>(null)

  useEffect(() => { setTheme(getInitialTheme()) }, [])
  useEffect(() => { applyTheme(theme) }, [theme])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setThemeOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null
      if (!t || themeBtnRef.current?.contains(t)) return
      setThemeOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const listMenu = useMemo(() => [
    { to: '#', label: 'Truyện mới cập nhật' },
    { to: '#', label: 'Truyện Hot' },
    { to: '#', label: 'Truyện Full' },
    { to: '#', label: 'Tiên Hiệp Hay' },
    { to: '#', label: 'Kiếm Hiệp Hay' },
    { to: '#', label: 'Ngôn Tình Hay' },
    { to: '#', label: 'Ngôn Tình Ngược' },
    { to: '#', label: 'Ngôn Tình Sủng' },
  ], [])

  const chapterMenu = useMemo(() => [
    { to: '#', label: 'Dưới 100 chương' },
    { to: '#', label: '100 – 500 chương' },
    { to: '#', label: '500 – 1000 chương' },
    { to: '#', label: 'Trên 1000 chương' },
  ], [])

  const categoryColumns = useMemo(() => {
    const cols: Array<typeof CATEGORY_LINKS> = [[], [], [], []]
    CATEGORY_LINKS.forEach((c, i) => cols[i % 4].push(c))
    return cols
  }, [])

  const openMegaMenu = (key: 'danh-sach' | 'phan-loai') => {
    if (megaCloseTimer.current) window.clearTimeout(megaCloseTimer.current)
    setOpenMega(key)
  }
  const scheduleCloseMega = () => {
    if (megaCloseTimer.current) window.clearTimeout(megaCloseTimer.current)
    megaCloseTimer.current = window.setTimeout(() => setOpenMega(null), 130)
  }

  return (
    <>
      <header className={cx('header', scrolled && 'tf-header-scrolled')}>
        <div className="container header-content">
          <div className="header-left">
            <button className="icon-btn mobile-only" aria-label="Mở menu" onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>
            <Link to="/" className="logo" aria-label="Trang chủ">
              <BookOpen className="logo-icon" size={26} strokeWidth={2.5} />
              <span className="tf-logo-text">TRUYỆN FULL</span>
            </Link>
          </div>

          <nav className="nav-links desktop-only" aria-label="Điều hướng chính">
            {/* Danh sách */}
            <div className="tf-mega-wrap"
              onMouseEnter={() => openMegaMenu('danh-sach')}
              onMouseLeave={scheduleCloseMega}>
              <button className={cx('tf-toplink', openMega === 'danh-sach' && 'tf-toplink-active')} type="button">
                Danh sách <span className="tf-caret" aria-hidden />
              </button>
              {openMega === 'danh-sach' && (
                <div className="tf-mega" role="menu" aria-label="Danh sách"
                  onMouseEnter={() => openMegaMenu('danh-sach')} onMouseLeave={scheduleCloseMega}>
                  <div className="tf-mega-col">
                    <div className="tf-mega-title">Nổi bật</div>
                    {listMenu.map(i => (
                      <a key={i.label} href={i.to} className="tf-mega-link">{i.label}</a>
                    ))}
                  </div>
                  {categoryColumns.slice(0, 3).map((col, idx) => (
                    <div key={idx} className="tf-mega-col">
                      {idx === 0 && <div className="tf-mega-title">Thể loại</div>}
                      {idx !== 0 && <div className="tf-mega-title">&nbsp;</div>}
                      {col.map(cat => (
                        <Link key={cat.slug} to={`/the-loai/${cat.slug}`} className="tf-mega-link">{cat.name}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phân loại */}
            <div className="tf-mega-wrap"
              onMouseEnter={() => openMegaMenu('phan-loai')}
              onMouseLeave={scheduleCloseMega}>
              <button className={cx('tf-toplink', openMega === 'phan-loai' && 'tf-toplink-active')} type="button">
                Theo Chương <span className="tf-caret" aria-hidden />
              </button>
              {openMega === 'phan-loai' && (
                <div className="tf-mega tf-mega-narrow" role="menu" aria-label="Phân loại"
                  onMouseEnter={() => openMegaMenu('phan-loai')} onMouseLeave={scheduleCloseMega}>
                  <div className="tf-mega-col">
                    {chapterMenu.map(i => <a key={i.label} href={i.to} className="tf-mega-link">{i.label}</a>)}
                  </div>
                </div>
              )}
            </div>

            <div className="tf-spacer" />

            {/* Theme */}
            <div className="tf-mega-wrap" onMouseLeave={() => setThemeOpen(false)}>
              <button
                ref={themeBtnRef}
                className={cx('tf-toplink', themeOpen && 'tf-toplink-active')}
                onClick={() => setThemeOpen(v => !v)}
                aria-haspopup="menu" aria-expanded={themeOpen} type="button"
              >
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                Giao diện <span className="tf-caret" aria-hidden />
              </button>
              {themeOpen && (
                <div className="tf-mega tf-mega-narrow" role="menu" aria-label="Giao diện">
                  <div className="tf-mega-col">
                    <div className="tf-mega-title">Màu nền</div>
                    <div className="theme-row">
                      {(['light', 'gray', 'dark'] as Theme[]).map(t => (
                        <button key={t} className={cx('theme-btn', theme === t && 'theme-btn-active')} onClick={() => setTheme(t)}>
                          {t === 'light' ? '☀️ Sáng' : t === 'gray' ? '🌫️ Xám' : '🌙 Tối'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="tf-search desktop-only" role="search">
            <Search size={14} color="rgba(255,255,255,0.5)" />
            <input
              type="text" className="tf-search-input"
              placeholder="Tìm tên truyện, tác giả…"
              value={searchVal} onChange={e => setSearchVal(e.target.value)}
            />
            {searchVal && (
              <button className="tf-search-clear" onClick={() => setSearchVal('')} aria-label="Xoá">
                <X size={12} />
              </button>
            )}
            <button className="tf-search-btn" type="button" aria-label="Tìm kiếm">
              <Search size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-sheet-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="mobile-sheet-panel">
            <div className="mobile-sheet-head">
              <Link to="/" className="logo" style={{ fontSize: '1.1rem' }} onClick={() => setMobileOpen(false)}>
                <BookOpen className="logo-icon" size={20} strokeWidth={2.5} />
                <span className="tf-logo-text">TRUYỆN FULL</span>
              </Link>
              <button className="icon-btn" aria-label="Đóng" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mobile-search">
              <Search size={16} color="rgba(255,255,255,0.4)" />
              <input placeholder="Tìm kiếm truyện…" />
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Giao diện</div>
              <div className="theme-row">
                {(['light', 'gray', 'dark'] as Theme[]).map(t => (
                  <button key={t} className={cx('theme-btn', theme === t && 'theme-btn-active')} onClick={() => setTheme(t)}>
                    {t === 'light' ? '☀️ Sáng' : t === 'gray' ? '🌫️ Xám' : '🌙 Tối'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Thể loại</div>
              <div className="category-grid mobile-category-grid">
                {CATEGORY_LINKS.slice(0, 22).map(cat => (
                  <Link key={cat.slug} to={`/the-loai/${cat.slug}`} className="category-tag"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onClick={() => setMobileOpen(false)}>
                    <span className="dot" style={{ background: '#60c8ff' }} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
