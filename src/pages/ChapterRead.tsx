import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getChapterParagraphs } from '../data/chapterContent'
import { getNovelDetail } from '../data/novelDetail'

export function ChapterReadPage() {
  const { novelSlug, chapterNum: chapterNumRaw } = useParams<{ novelSlug: string; chapterNum: string }>()
  const navigate = useNavigate()

  const chapter = chapterNumRaw ? parseInt(chapterNumRaw, 10) : NaN
  const novel = novelSlug ? getNovelDetail(novelSlug) : undefined

  const valid = Boolean(novelSlug && novel && Number.isFinite(chapter) && chapter >= 1 && chapter <= novel.totalChapters)

  useEffect(() => {
    if (valid && novel) {
      document.title = `${novel.title} : Chương ${chapter} - TruyenFull`
    }
    return () => {
      document.title = 'truyenfull'
    }
  }, [valid, novel, chapter])

  useEffect(() => {
    if (!valid || !novel) return
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const k = e.key.toLowerCase()
      if (e.key === 'ArrowLeft' || k === 'a') {
        e.preventDefault()
        if (chapter > 1) navigate(`/${novel.slug}/chuong/${chapter - 1}`)
      }
      if (e.key === 'ArrowRight' || k === 'd') {
        e.preventDefault()
        if (chapter < novel.totalChapters) navigate(`/${novel.slug}/chuong/${chapter + 1}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [valid, novel, chapter, navigate])

  if (!novelSlug || !novelSlug.trim()) return <Navigate to="/" replace />
  if (!novel || !Number.isFinite(chapter) || chapter < 1) return <Navigate to={`/${novelSlug}`} replace />
  if (chapter > novel.totalChapters) return <Navigate to={`/${novelSlug}`} replace />

  const paragraphs = getChapterParagraphs(novel.slug, chapter)
  const prev = chapter > 1 ? `/${novel.slug}/chuong/${chapter - 1}` : null
  const next = chapter < novel.totalChapters ? `/${novel.slug}/chuong/${chapter + 1}` : null

  return (
    <div className="container chapter-read-page">
      <div className="chapter-read-wrap">
        <nav className="novel-bc chapter-bc" aria-label="Breadcrumb">
        <Link to="/">Truyện</Link>
        <span className="novel-bc-sep"> › </span>
        <Link to={`/${novel.slug}`}>{novel.title}</Link>
        <span className="novel-bc-sep"> › </span>
        <span className="novel-bc-current">Chương {chapter}</span>
        </nav>

        <article className="chapter-read-panel tf-panel">
        <header className="chapter-read-head">
          <p className="chapter-read-series">{novel.title}</p>
          <h1 className="chapter-read-title">Chương {chapter}</h1>
        </header>

        <hr className="chapter-read-rule" />

        <nav className="chapter-read-nav chapter-read-nav-top" aria-label="Chuyển chương">
          {prev ? (
            <Link to={prev} className="chapter-read-btn">
              ‹ Chương trước
            </Link>
          ) : (
            <span className="chapter-read-btn disabled">‹ Chương trước</span>
          )}
          {next ? (
            <Link to={next} className="chapter-read-btn">
              Chương tiếp ›
            </Link>
          ) : (
            <span className="chapter-read-btn disabled">Chương tiếp ›</span>
          )}
        </nav>

        <hr className="chapter-read-rule thin" />

        <div className="chapter-read-body">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <hr className="chapter-read-rule thin" />

        <nav className="chapter-read-nav chapter-read-nav-bottom" aria-label="Chuyển chương">
          {prev ? (
            <Link to={prev} className="chapter-read-btn">
              ‹ Chương trước
            </Link>
          ) : (
            <span className="chapter-read-btn disabled">‹ Chương trước</span>
          )}
          {next ? (
            <Link to={next} className="chapter-read-btn">
              Chương tiếp ›
            </Link>
          ) : (
            <span className="chapter-read-btn disabled">Chương tiếp ›</span>
          )}
        </nav>

        <footer className="chapter-read-footer">
          <button type="button" className="chapter-read-linkish">
            Báo lỗi chương
          </button>
          <span className="chapter-read-dot">·</span>
          <button type="button" className="chapter-read-linkish">
            Bình luận
          </button>
        </footer>

        <p className="chapter-read-hint">Dùng phím mũi tên trái/phải hoặc A/D để chuyển chương.</p>
        </article>

        <nav className="chapter-read-toolbar" aria-label="Điều hướng nhanh">
        {prev ? (
          <Link to={prev} className="chapter-read-toolbar-btn">
            ‹ Trước
          </Link>
        ) : (
          <span className="chapter-read-toolbar-btn ghost">‹ Trước</span>
        )}
        <span className="chapter-read-toolbar-mid">
          <span className="chapter-read-toolbar-num">{chapter}</span>
          <span className="chapter-read-toolbar-sep">/</span>
          <span>{novel.totalChapters}</span>
        </span>
        {next ? (
          <Link to={next} className="chapter-read-toolbar-btn">
            Sau ›
          </Link>
        ) : (
          <span className="chapter-read-toolbar-btn ghost">Sau ›</span>
        )}
        <Link to={`/${novel.slug}`} className="chapter-read-toolbar-toc">
          Mục lục
        </Link>
        </nav>
      </div>
    </div>
  )
}
