import { useMemo, useState } from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { genreHref, getNovelDetail, coverUrl as novelCoverUrl } from '../data/novelDetail'
import { CoverImage } from '../ui/CoverImage'
import { RatingStars } from '../ui/RatingStars'

const CHAPTERS_PER_PAGE = 25

function chapterLabel(num: number, extras?: Record<number, string>) {
  const extra = extras?.[num]
  return extra ? `Chương ${num}: ${extra}` : `Chương ${num}`
}

export function NovelDetailPage() {
  const { novelSlug } = useParams<{ novelSlug: string }>()
  const novel = novelSlug ? getNovelDetail(novelSlug) : undefined
  const [synopsisOpen, setSynopsisOpen] = useState(false)
  const [chapterPage, setChapterPage] = useState(1)

  const totalPages = novel ? Math.ceil(novel.totalChapters / CHAPTERS_PER_PAGE) : 1

  const paragraphs = useMemo(() => novel?.synopsis.split('\n\n').filter(Boolean) ?? [], [novel])

  const chaptersSlice = useMemo(() => {
    if (!novel) return []
    const start = (chapterPage - 1) * CHAPTERS_PER_PAGE + 1
    const end = Math.min(start + CHAPTERS_PER_PAGE - 1, novel.totalChapters)
    const list: number[] = []
    for (let i = start; i <= end; i++) list.push(i)
    return list
  }, [novel, chapterPage])

  if (!novelSlug) return <Navigate to="/" replace />
  if (!novel) return <Navigate to="/" replace />

  const coverSrc = novelCoverUrl(novel.coverSeed)

  const latestChapter = novel.totalChapters

  return (
    <div className="novel-detail-page">
      <div className="novel-detail-hero-band">
        <div className="container novel-detail-hero-inner">
          <nav className="novel-bc novel-bc-on-dark" aria-label="Breadcrumb">
            <Link to="/">Truyện</Link>
            <span className="novel-bc-sep"> › </span>
            <span className="novel-bc-current">{novel.title}</span>
          </nav>
          <header className="novel-detail-hero">
            <h1 className="novel-detail-title-lg">{novel.title}</h1>
            <div className="novel-detail-sub">
              <span className="novel-detail-author-inline">{novel.author}</span>
              <span className="novel-detail-dot">·</span>
              <span>{novel.totalChapters} chương</span>
              <span className="novel-detail-dot">·</span>
              <span className={`novel-status-pill novel-status-${novel.statusLabel === 'Full' ? 'full' : 'ongoing'}`}>
                {novel.statusLabel}
              </span>
            </div>
            <div className="novel-detail-actions">
              <Link to={`/${novel.slug}/chuong/1`} className="novel-btn novel-btn-primary">
                <BookOpen size={17} strokeWidth={2.25} />
                Đọc từ đầu
              </Link>
              <Link to={`/${novel.slug}/chuong/${latestChapter}`} className="novel-btn novel-btn-secondary">
                Chương mới nhất
                <ChevronRight size={17} strokeWidth={2.25} />
              </Link>
            </div>
          </header>
        </div>
      </div>

      <div className="container novel-detail-wrap">
        <div className="novel-detail-grid">
          <article className="novel-detail-main tf-panel">
            <section className="novel-info-block" aria-labelledby="novel-info-heading">
              <h2 id="novel-info-heading" className="novel-info-heading">
                Thông tin truyện
              </h2>

              <div className="novel-info-inner">
                <div className="novel-cover-wrap">
                  <div className="novel-cover-frame">
                    <CoverImage src={coverSrc} alt={novel.title} className="novel-cover-large" loading="lazy" />
                  </div>
                </div>
                <div className="novel-meta">
                  <div className="novel-genre-row">
                    {novel.genres.map((g) => (
                      <Link key={g} to={genreHref(g)} className="novel-genre-pill">
                        {g}
                      </Link>
                    ))}
                  </div>
                  <dl className="novel-dl">
                    <div className="novel-dl-row">
                      <dt>Tác giả</dt>
                      <dd>{novel.author}</dd>
                    </div>
                    <div className="novel-dl-row">
                      <dt>Trạng thái</dt>
                      <dd>{novel.statusLabel}</dd>
                    </div>
                  </dl>
                  <div className="novel-rating-card">
                    <RatingStars score={novel.rating.score} />
                    <p className="novel-rating-text">
                      <strong>{novel.rating.score}</strong>/10 ·{' '}
                      <span className="novel-rating-votes">{novel.rating.votes} lượt đánh giá</span>
                    </p>
                  </div>
                {novel.alternateTitles?.length ? (
                  <p className="novel-alt">
                    Tên khác: <span>{novel.alternateTitles.join(', ')}</span>
                  </p>
                ) : null}
                <div className="novel-synopsis">
                  <div className="novel-synopsis-label">Giới thiệu:</div>
                  <div className={synopsisOpen ? 'novel-synopsis-body open' : 'novel-synopsis-body'}>
                    {(synopsisOpen ? paragraphs : paragraphs.slice(0, 1)).map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                  {paragraphs.length > 1 ? (
                    <button type="button" className="novel-more" onClick={() => setSynopsisOpen((v) => !v)}>
                      {synopsisOpen ? 'Thu gọn «' : 'Xem thêm »'}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="novel-chapters" aria-labelledby="chapters-heading">
            <div className="novel-chapters-head">
              <h2 id="chapters-heading" className="novel-info-heading novel-info-heading-inline">
                Danh sách chương
              </h2>
              <span className="novel-chapters-meta">
                Hiển thị {chaptersSlice[0] ?? 0}–{chaptersSlice[chaptersSlice.length - 1] ?? 0} / {novel.totalChapters}
              </span>
            </div>
            <ul className="novel-chapter-grid">
              {chaptersSlice.map((n) => (
                <li key={n}>
                  <Link to={`/${novel.slug}/chuong/${n}`} className="novel-chapter-chip">
                    {chapterLabel(n, novel.chapterExtras)}
                  </Link>
                </li>
              ))}
            </ul>

            <nav className="novel-pagination" aria-label="Phân trang chương">
              <button
                type="button"
                className="novel-page-btn"
                disabled={chapterPage <= 1}
                onClick={() => setChapterPage((p) => Math.max(1, p - 1))}
              >
                ‹ Trước
              </button>
              <span className="novel-page-num">
                Trang <strong>{chapterPage}</strong> / {totalPages}
              </span>
              <button
                type="button"
                className="novel-page-btn"
                disabled={chapterPage >= totalPages}
                onClick={() => setChapterPage((p) => Math.min(totalPages, p + 1))}
              >
                Tiếp ›
              </button>
            </nav>
          </section>

          <section className="novel-comments-placeholder" aria-labelledby="cmt-heading">
            <h2 id="cmt-heading" className="novel-info-heading">
              Bình luận truyện
            </h2>
            <p className="novel-muted">Chưa kết nối API — để chỗ hiển thị bình luận sau.</p>
          </section>
        </article>

        <aside className="novel-detail-aside">
          <div className="tf-panel novel-aside-block novel-aside-read-card">
            <h3 className="novel-aside-title">Đọc nhanh</h3>
            <p className="novel-aside-desc">Tiếp tục hành trình của nhân vật ngay trên trình duyệt.</p>
            <Link to={`/${novel.slug}/chuong/1`} className="novel-aside-cta">
              Mở Chương 1
            </Link>
          </div>

          {novel.sameAuthor.length > 0 ? (
            <div className="tf-panel novel-aside-block">
              <h3 className="novel-aside-title">Truyện cùng tác giả</h3>
              <ul className="novel-aside-list">
                {novel.sameAuthor.map((item) => (
                  <li key={item.title}>
                    {item.slug === '#' ? (
                      <span className="novel-aside-link muted">{item.title}</span>
                    ) : (
                      <Link to={`/${item.slug}`} className="novel-aside-link">
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="tf-panel novel-aside-block novel-aside-muted">
              <h3 className="novel-aside-title">Truyện cùng tác giả</h3>
              <p className="novel-aside-empty">Chưa có danh sách — dữ liệu demo.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
    </div>
  )
}
