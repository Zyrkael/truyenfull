import { slugify } from '../lib/slug'

export type NovelDetail = {
  slug: string
  title: string
  author: string
  genres: string[]
  statusLabel: string
  rating: { score: number; votes: number }
  alternateTitles?: string[]
  synopsis: string
  coverSeed: string
  /** Tiêu đề riêng một số chương (số chương → label sau "Chương n") */
  chapterExtras?: Record<number, string>
  totalChapters: number
  sameAuthor: Array<{ slug: string; title: string }>
}

const CAM_Y_SLUG = 'cam-y-vi-phu-son-huu-thanh-moc'
export const BI_EP_SLUG = 'bi-ep-lam-thong-phong-ta-quay-nguoi-ga-cho-cha-cua-tra-nam'

export const NOVEL_DETAILS: Record<string, NovelDetail> = {
  [BI_EP_SLUG]: {
    slug: BI_EP_SLUG,
    title: 'Bị Ép Làm Thông Phòng? Ta Quay Người Gả Cho Cha Của Tra Nam',
    author: 'Đang cập nhật',
    genres: ['Cổ Đại', 'Ngôn Tình', 'Xuyên Sách'],
    statusLabel: 'Đang ra',
    rating: { score: 8.5, votes: 120 },
    coverSeed: 'bi-ep-cover',
    totalChapters: 374,
    synopsis:
      'Nàng bị ép vào thế khó trong hậu viện, nhưng lần này không còn chọn cách nhún nhường. Một đêm, một quyết định táo bạo thay đổi cục diện — và đưa nàng đến vị trí không ai ngờ tới.\n\n' +
      'Cha chồng của kẻ đã hành hạ nàng… lại là mảnh ghép có thể giữ lại mạng sống nàng giữa vòng tranh đấu trong phủ. Nàng không còn đường lui, chỉ còn cách diễn cho tròn vai, rồi từng bước lật ngược cục diện.\n\n' +
      'Đây là bản demo UI; nối API sau để hiển thị giới thiệu đầy đủ từ nguồn dữ liệu.',
    sameAuthor: [],
  },
  [CAM_Y_SLUG]: {
    slug: CAM_Y_SLUG,
    title: 'Cẩm Y Vi Phu - Sơn Hữu Thanh Mộc',
    author: 'Sơn Hữu Thanh Mộc',
    genres: ['Ngôn Tình', 'Cổ Đại', 'Sủng'],
    statusLabel: 'Full',
    rating: { score: 8.7, votes: 3 },
    alternateTitles: ['Cùng Quân Hoan'],
    coverSeed: 'cam-y-vi-phu-cover',
    totalChapters: 94,
    chapterExtras: {
      33: 'Nhân tình',
      34: 'Khối bạc vụn',
    },
    synopsis:
      'Đích nữ Ninh Xương Hầu phủ vừa mới hồi kinh có một bí mật. Trên đường đi tìm thân nhân nàng đã bị bán vào thanh lâu.\n\n' +
      'Vì tự bảo vệ mình, cũng vì có thể trở về Hầu phủ kinh thành, nàng trao thân cho thiếu chủ của một tiêu cục, dụ hắn chuộc thân cho mình, mang nàng tới kinh thành.\n\n' +
      'Ngày vào kinh, nàng bỏ thuốc cả một đám người tiêu cục, một mình chạy đến Ninh Xương Hầu phủ. Vốn tưởng rằng cuối cùng đã khổ tận cam lai, nào ngờ vào yến tiệc xem mắt của mình, nàng lại một lần nữa gặp được hắn — lúc này hắn đã là Chỉ Huy Sứ Cẩm Y Vệ…',
    sameAuthor: [
      { slug: '#', title: 'Ma Tôn Mang Thai Con Ta' },
      { slug: '#', title: 'Ma Quân Nghe Thấy Ta Muốn Công Lược Hắn' },
      { slug: '#', title: 'Cháu Tới Để Thừa Kế Gia Sản Của Chú Đó' },
      { slug: '#', title: 'Nếu Còn Không Được Thì Ta Sẽ Đi Ngay Đấy' },
      { slug: '#', title: 'Nữ Phụ Thế Thân Không Phải Người' },
      { slug: '#', title: 'Đoản Mệnh Lão Đại Cố Chấp Yêu Tôi' },
      { slug: '#', title: 'Công Chúa Tại Thượng' },
      { slug: '#', title: 'Cùng Người Yêu Cũ Xuyên Đến 23 năm sau' },
      { slug: '#', title: 'Bệnh Kiều Lão Đại Cầu Buông Tha' },
      { slug: '#', title: 'Hai Đồ Đệ Tranh Nhau Làm Đạo Lữ Của Ta' },
    ],
  },
}

export function getNovelDetail(slug: string): NovelDetail | undefined {
  return NOVEL_DETAILS[slug]
}

export function genreHref(genre: string) {
  return `/the-loai/${slugify(genre)}`
}

export function coverUrl(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/300/450`
}
