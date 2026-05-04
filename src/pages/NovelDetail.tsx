import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { genreHref, getNovelDetail, coverUrl as novelCoverUrl } from '../data/novelDetail'
import { CoverImage } from '../ui/CoverImage'

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

  return (
    <div className="container novel-detail-wrap">
      <nav className="novel-bc" aria-label="Breadcrumb">
        <Link to="/">Truyện</Link>
        <span className="novel-bc-sep"> › </span>
        <span className="novel-bc-current">{novel.title}</span>
      </nav>

      <div className="novel-detail-grid">
        <article className="novel-detail-main tf-panel">
          <header className="novel-detail-head">
            <h1 className="novel-detail-title">{novel.title}</h1>
          </header>

          <section className="novel-info-block" aria-labelledby="novel-info-heading">
            <h2 id="novel-info-heading" className="novel-info-heading">
              Thông tin truyện
            </h2>

            <div className="novel-info-inner">
              <div className="novel-cover-wrap">
                <CoverImage src={coverSrc} alt={novel.title} className="novel-cover-large" loading="lazy" />
              </div>
              <div className="novel-meta">
                <h3 className="novel-meta-title">{novel.title}</h3>
                <dl className="novel-dl">
                  <div className="novel-dl-row">
                    <dt>Tác giả:</dt>
                    <dd>{novel.author}</dd>
                  </div>
                  <div className="novel-dl-row">
                    <dt>Thể loại:</dt>
                    <dd>
                      {novel.genres.map((g, i) => (
                        <span key={g}>
                          {i > 0 ? ', ' : null}
                          <Link to={genreHref(g)}>{g}</Link>
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="novel-dl-row">
                    <dt>Trạng thái:</dt>
                    <dd>{novel.statusLabel}</dd>
                  </div>
                </dl>
                <p className="novel-rating">
                  Đánh giá: <strong>{novel.rating.score}</strong>/10 từ <strong>{novel.rating.votes}</strong> lượt
                </p>
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
            <h2 id="chapters-heading" className="novel-info-heading">
              Danh sách chương
            </h2>
            <ul className="novel-chapter-cols">
              {chaptersSlice.map((n) => (
                <li key={n}>
                  <Link to={`/${novel.slug}/chuong/${n}`} className="novel-chapter-link">
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
        </aside>
      </div>
    </div>
  )
}
