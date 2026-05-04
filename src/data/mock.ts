import { slugify } from '../lib/slug'

export type HotNovel = { id: number; title: string; img: string; isFull: boolean }
export type UpdateNovel = {
  id: number
  title: string
  cat: string
  chap: string
  time: string
  isNew: boolean
  /** slug URL chi tiết truyện, ví dụ cam-y-vi-phu-son-huu-thanh-moc */
  slug?: string
  /** Nếu có, link trực tiếp tới chương đọc (ví dụ 1 = /slug/chuong/1) */
  readChapter?: number
}
export type CompletedNovel = { id: number; title: string; img: string; chap: string }

export const CATEGORIES = [
  'Tiên Hiệp',
  'Kiếm Hiệp',
  'Ngôn Tình',
  'Đam Mỹ',
  'Quan Trường',
  'Chủ công',
  'Võng Du',
  'Khoa Huyễn',
  'Hệ Thống',
  'Huyền Huyễn',
  'Dị Giới',
  'Dị Năng',
  'Sắc',
  'Quân Sự',
  'Lịch Sử',
  'Xuyên Không',
  'Xuyên Sách',
  'Xuyên Nhanh',
  'Cận Đại',
  'Trọng Sinh',
  'Trinh Thám',
  'Thám Hiểm',
  'Linh Dị',
  'Ngược',
  'Sủng',
  'Cung Đấu',
  'Nữ Cường',
  'Gia Đấu',
  'Đô Thị',
  'Hài Hước',
  'Điền Văn',
  'Cổ Đại',
  'Mạt Thế',
  'Light Novel',
  'Việt Nam',
  'Giải Trí',
  'Tương Lai',
  'Đoản Văn',
  'Truyện Ngắn',
  'Khác',
] as const

export const CATEGORY_LINKS = CATEGORIES.map((name) => ({ name, slug: slugify(name) }))

/** Ảnh cố định theo seed (picsum), tránh hotlink Unsplash hay lỗi mạng. */
function cover(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/300/450`
}

export const HOT_NOVELS: HotNovel[] = [
  {
    id: 1,
    title: 'Mỹ Dung Sư Xuyên Qua Làm Nông Phụ Làm Giàu Nuôi Con',
    img: cover('tf-hot-1'),
    isFull: true,
  },
  {
    id: 2,
    title: 'Lưu Đày Thần Y Mang Theo Không Gian Chạy Nạn',
    img: cover('tf-hot-2'),
    isFull: false,
  },
  {
    id: 3,
    title: 'Cẩm Nang Sinh Tồn Của Kẻ Mê Ăn Ở Cổ Đại',
    img: cover('tf-hot-3'),
    isFull: true,
  },
  {
    id: 4,
    title: 'Trở Lại Thập Niên 70: Gả Cho Nam Xứng Xui Xẻo',
    img: cover('tf-hot-4'),
    isFull: false,
  },
  {
    id: 5,
    title: 'Xuyên Thành Nữ Chính Làm Nông',
    img: cover('tf-hot-5'),
    isFull: true,
  },
  {
    id: 6,
    title: 'Thập Niên 70: Xuyên Thành Đầu Quả Tim Của Vai Ác',
    img: cover('tf-hot-6'),
    isFull: false,
  },
]

export const NEW_UPDATES: UpdateNovel[] = [
  {
    id: 1,
    title: 'Bị Ép Làm Thông Phòng? Ta Quay Người Gả Cho Cha Của Tra Nam',
    cat: 'Cổ Đại',
    chap: 'Chương 374',
    time: '4 giờ trước',
    isNew: true,
    slug: 'bi-ep-lam-thong-phong-ta-quay-nguoi-ga-cho-cha-cua-tra-nam',
    readChapter: 1,
  },
  { id: 2, title: 'Uống Băng - Đào Tử Nhi', cat: 'Sủng', chap: 'Chương 183', time: '5 giờ trước', isNew: true },
  { id: 3, title: 'Ngày Đại Hôn, Ta Tự Tay Hủy Hôn', cat: 'Cổ Đại', chap: 'Chương 12', time: '9 giờ trước', isNew: false },
  { id: 4, title: 'Yêu Nữ', cat: 'Cổ Đại', chap: 'Chương 12', time: '10 giờ trước', isNew: false },
  {
    id: 5,
    title: 'Cẩm Y Vi Phu - Sơn Hữu Thanh Mộc',
    cat: 'Cổ Đại',
    chap: 'Chương 94',
    time: '10 giờ trước',
    isNew: false,
    slug: 'cam-y-vi-phu-son-huu-thanh-moc',
  },
  { id: 6, title: 'Nghe Nói Tôi Là Tra A - Qua Vân Tê', cat: 'Khác', chap: 'Chương 118', time: '5 ngày trước', isNew: false },
]

export const COMPLETED_NOVELS: CompletedNovel[] = [
  { id: 101, title: 'Trọng Sinh Trở Về Trước Ngày Nữ Chính Gian Xảo Gả Vào Nhà', img: cover('tf-done-101'), chap: '487 chương' },
  { id: 102, title: 'Quân Hôn 70: Quân Tẩu Xinh Đẹp Nuôi Con Chăm Chồng', img: cover('tf-done-102'), chap: '338 chương' },
  { id: 103, title: 'Huyền Môn Thần Toán Bói Quẻ Quá Linh Toàn Kinh Thành Chấn Động', img: cover('tf-done-103'), chap: '693 chương' },
  { id: 104, title: 'Quỷ Đoản Mệnh Nhà Họ Tạ Sống Lâu Trăm Tuổi Rồi', img: cover('tf-done-104'), chap: '957 chương' },
  { id: 105, title: 'Mười Năm Hôn Nhân', img: cover('tf-done-105'), chap: '33 chương' },
  { id: 106, title: 'Bí Mật Tân Hôn', img: cover('tf-done-106'), chap: '107 chương' },
]

