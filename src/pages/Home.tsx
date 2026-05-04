import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORY_LINKS, COMPLETED_NOVELS, HOT_NOVELS, NEW_UPDATES } from '../data/mock'
import { CoverImage } from '../ui/CoverImage'

export function HomePage() {
  return (
    <>
      <section className="tf-hero">
        <div className="tf-hero-bg" />
        <div className="tf-hero-inner">
          <div className="tf-panel">
            <div className="tf-section-head">
              <div className="tf-section-title">
                TRUYỆN HOT <span className="tf-section-icon" aria-hidden>🔥</span>
              </div>
              <div className="tf-filter">
                <span className="tf-filter-label">TẤT CẢ</span>
                <span className="tf-caret" aria-hidden />
              </div>
            </div>

            <div className="tf-hot-grid">
              {HOT_NOVELS.map((novel) => (
                <a key={novel.id} href="#" className="tf-cover" aria-label={novel.title}>
                  <CoverImage src={novel.img} alt={novel.title} loading="lazy" />
                  <div className="tf-cover-title">{novel.title}</div>
                  <div className="tf-cover-tag">Full</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <section className="updates-list">
          <div className="tf-section-head tf-section-head-compact">
            <div className="tf-section-title">TRUYỆN MỚI CẬP NHẬT &gt;</div>
            <div className="tf-filter">
              <span className="tf-filter-label">TẤT CẢ</span>
              <span className="tf-caret" aria-hidden />
            </div>
          </div>
          <div className="updates-container">
            {NEW_UPDATES.map((update) => (
              <div key={update.id} className="update-item">
                <div className="update-title">
                  <ChevronRight size={16} className="update-title-icon" />
                  {update.slug ? (
                    <Link
                      to={
                        update.readChapter != null
                          ? `/${update.slug}/chuong/${update.readChapter}`
                          : `/${update.slug}`
                      }
                    >
                      {update.title}
                    </Link>
                  ) : (
                    <a href="#">{update.title}</a>
                  )}
                  {update.isNew && <span className="pill pill-new">NEW</span>}
                </div>
                <div className="update-category">{update.cat}</div>
                <div className="update-chapter">{update.chap}</div>
                <div className="update-time">{update.time}</div>
              </div>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <div className="tf-section-head tf-section-head-compact">
            <div className="tf-section-title">THỂ LOẠI TRUYỆN</div>
          </div>
          <div className="category-grid">
            {CATEGORY_LINKS.map((cat) => (
              <Link key={cat.slug} to={`/the-loai/${cat.slug}`} className="category-tag">
                <span className="dot" />
                {cat.name}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <section className="completed-section">
        <div className="tf-section-head tf-section-head-compact">
          <div className="tf-section-title">
            TRUYỆN ĐÃ HOÀN THÀNH <span className="tf-section-icon" aria-hidden>⭐</span>
          </div>
        </div>
        <div className="tf-hot-grid">
          {COMPLETED_NOVELS.map((novel) => (
            <a key={novel.id} href="#" className="tf-cover" aria-label={novel.title}>
              <CoverImage src={novel.img} alt={novel.title} loading="lazy" />
              <div className="tf-cover-title">{novel.title}</div>
              <div className="tf-cover-tag">Full</div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

