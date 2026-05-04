import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CATEGORY_LINKS, NEW_UPDATES } from '../data/mock'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const cat = useMemo(() => CATEGORY_LINKS.find((c) => c.slug === slug), [slug])

  const items = useMemo(() => {
    if (!cat) return []
    return NEW_UPDATES.filter((u) => u.cat.toLowerCase() === cat.name.toLowerCase())
  }, [cat])

  return (
    <div className="container">
    <section className="updates-list">
      <div className="page-head">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {cat ? `Thể loại: ${cat.name}` : 'Không tìm thấy thể loại'}
        </h2>
        <Link to="/" className="link-muted">
          ← Về trang chủ
        </Link>
      </div>

      <div className="updates-container">
        {(items.length ? items : NEW_UPDATES.slice(0, 10)).map((update) => (
          <div key={update.id} className="update-item">
            <div className="update-title">
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
    </div>
  )
}

