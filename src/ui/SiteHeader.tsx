import { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, Menu, Search, X } from 'lucide-react'
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
  const themeBtnRef = useRef<HTMLButtonElement | null>(null)
  const megaCloseTimer = useRef<number | null>(null)

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setThemeOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target) return
      if (themeBtnRef.current?.contains(target)) return
      setThemeOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const listMenu = useMemo(
    () => [
      { to: '#', label: 'Truyện tranh' },
      { to: '#', label: 'Truyện mới cập nhật' },
      { to: '#', label: 'Truyện Hot' },
      { to: '#', label: 'Truyện Full' },
      { to: '#', label: 'Tiên Hiệp Hay' },
      { to: '#', label: 'Kiếm Hiệp Hay' },
      { to: '#', label: 'Truyện Teen Hay' },
      { to: '#', label: 'Ngôn Tình Hay' },
      { to: '#', label: 'Ngôn Tình Ngược' },
      { to: '#', label: 'Ngôn Tình Sủng' },
      { to: '#', label: 'Ngôn Tình Hài' },
    ],
    [],
  )

  const chapterMenu = useMemo(
    () => [
      { to: '#', label: 'Dưới 100 chương' },
      { to: '#', label: '100 - 500 chương' },
      { to: '#', label: '500 - 1000 chương' },
      { to: '#', label: 'Trên 1000 chương' },
    ],
    [],
  )

  const categoryColumns = useMemo(() => {
    const cols: Array<typeof CATEGORY_LINKS> = [[], [], [], []]
    CATEGORY_LINKS.forEach((c, idx) => {
      cols[idx % cols.length].push(c)
    })
    return cols
  }, [])

  const openMegaMenu = (key: 'danh-sach' | 'phan-loai') => {
    if (megaCloseTimer.current) window.clearTimeout(megaCloseTimer.current)
    setOpenMega(key)
  }

  const scheduleCloseMega = () => {
    if (megaCloseTimer.current) window.clearTimeout(megaCloseTimer.current)
    megaCloseTimer.current = window.setTimeout(() => setOpenMega(null), 120)
  }

  return (
    <>
      <header
        className={cx('header', 'tf-header', scrolled && 'tf-header-scrolled')}
      >
        <div className="container header-content">
          <div className="header-left">
            <button className="icon-btn mobile-only" aria-label="Mở menu" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>

            <Link to="/" className="logo" aria-label="Trang chủ">
              <BookOpen className="logo-icon" size={28} />
              <span className="tf-logo-text">TRUYỆN FULL</span>
            </Link>
          </div>

          <nav className="nav-links desktop-only" aria-label="Điều hướng">
            <div
              className="tf-mega-wrap"
              onMouseEnter={() => openMegaMenu('danh-sach')}
              onMouseLeave={scheduleCloseMega}
            >
              <button className={cx('tf-toplink', openMega === 'danh-sach' && 'tf-toplink-active')} type="button">
                Danh sách <span className="tf-caret" aria-hidden />
              </button>
              {openMega === 'danh-sach' && (
                <div className="tf-mega" role="menu" aria-label="Danh sách">
                  <div className="tf-mega-col">
                    {listMenu.map((i) => (
                      <a key={i.label} href={i.to} className="tf-mega-link">
                        {i.label}
                      </a>
                    ))}
                  </div>
                  {categoryColumns.slice(0, 3).map((col, idx) => (
                    <div key={idx} className="tf-mega-col">
                      {col.map((cat) => (
                        <Link key={cat.slug} to={`/the-loai/${cat.slug}`} className="tf-mega-link">
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="tf-mega-wrap"
              onMouseEnter={() => openMegaMenu('phan-loai')}
              onMouseLeave={scheduleCloseMega}
            >
              <button className={cx('tf-toplink', openMega === 'phan-loai' && 'tf-toplink-active')} type="button">
                Phân loại theo Chương <span className="tf-caret" aria-hidden />
              </button>
              {openMega === 'phan-loai' && (
                <div className="tf-mega tf-mega-narrow" role="menu" aria-label="Phân loại theo chương">
                  <div className="tf-mega-col">
                    {chapterMenu.map((i) => (
                      <a key={i.label} href={i.to} className="tf-mega-link">
                        {i.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="tf-spacer" />

            <div className="tf-mega-wrap" onMouseLeave={() => setThemeOpen(false)}>
              <button
                ref={themeBtnRef}
                className={cx('tf-toplink', themeOpen && 'tf-toplink-active')}
                onClick={() => setThemeOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={themeOpen}
                type="button"
              >
                Tùy chỉnh <span className="tf-caret" aria-hidden />
              </button>
              {themeOpen && (
                <div className="tf-mega tf-mega-narrow" role="menu" aria-label="Tùy chỉnh">
                  <div className="tf-mega-col">
                    <div className="tf-mega-title">Màu nền</div>
                    <div className="theme-row" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
                      <button className={cx('theme-btn', theme === 'light' && 'theme-btn-active')} onClick={() => setTheme('light')}>
                        Sáng
                      </button>
                      <button className={cx('theme-btn', theme === 'gray' && 'theme-btn-active')} onClick={() => setTheme('gray')}>
                        Xám nhạt
                      </button>
                      <button className={cx('theme-btn', theme === 'dark' && 'theme-btn-active')} onClick={() => setTheme('dark')}>
                        Tối
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="tf-search desktop-only" role="search">
            <input type="text" className="tf-search-input" placeholder="Tìm kiếm" />
            <button className="tf-search-btn" type="button" aria-label="Tìm kiếm">
              <Search size={16} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-sheet-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="mobile-sheet-panel">
            <div className="mobile-sheet-head">
              <div className="logo" style={{ fontSize: '1.25rem' }}>
                <BookOpen className="logo-icon" size={22} />
                <span className="text-gradient">TruyenFull</span>
              </div>
              <button className="icon-btn" aria-label="Đóng menu" onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-search">
              <Search size={18} color="var(--text-tertiary)" />
              <input className="search-input" placeholder="Tìm kiếm truyện..." />
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Màu nền</div>
              <div className="theme-row">
                <button className={cx('theme-btn', theme === 'light' && 'theme-btn-active')} onClick={() => setTheme('light')}>
                  Sáng
                </button>
                <button className={cx('theme-btn', theme === 'gray' && 'theme-btn-active')} onClick={() => setTheme('gray')}>
                  Xám nhạt
                </button>
                <button className={cx('theme-btn', theme === 'dark' && 'theme-btn-active')} onClick={() => setTheme('dark')}>
                  Tối
                </button>
              </div>
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Thể loại</div>
              <div className="category-grid mobile-category-grid">
                {CATEGORY_LINKS.slice(0, 20).map((cat) => (
                  <Link key={cat.slug} to={`/the-loai/${cat.slug}`} className="category-tag" onClick={() => setMobileOpen(false)}>
                    <span className="dot" />
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

