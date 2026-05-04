import { BI_EP_SLUG } from './novelDetail'

/** Đoạn văn demo (không copy nội dung có bản quyền từ web nguồn). */
const BI_EP_CH1: string[] = [
  'Ánh nến rung rinh in bóng người lên vách gỗ. Ngoài hiên, gió đêm lùa qua khe cửa khiến ngọn lửa bập bùng như muốn kể một chuyện dở dang.',
  'Nàng siết chặt mép tay áo, cố giữ nhịp thở đều. Từng bước chân xa vọng lại gần, nặng như đang cân thử lòng gan dạ của người đứng trong phòng.',
  '“Chỉ cần qua được đêm nay,” nàng thầm nhủ. Ký ức kiếp trước còn vương như sợi khói — lần này nàng không để ai kéo mình vào lối cũ nữa.',
  'Tiếng bước chân dừng lại sau cánh cửa. Một thoáng im lặng, rồi có người gõ nhẹ hai tiếng, trầm và gọn.',
  'Nàng ngẩng lên. Dù chưa mở miệng, nàng đã quyết: dù cục diện có xoay thế nào, nàng sẽ chọn con đường ít làm tổn thương mình nhất — và không còn nhún nhường vô điều kiện như xưa.',
  'Cánh cửa hé mở. Hơi lạnh tràn vào, cuốn theo mùi sắt ẩm và một tia nhìn sắc như dao. Nàng biết: câu chuyện giữa các phe trong phủ, từ đêm nay, sẽ bắt đầu viết lại từ đầu.',
]

const BI_EP_CH2: string[] = [
  'Sáng hôm sau, tiếng mõ còn vương trong sân. Nàng lau mặt bằng nước lạnh, để tỉnh lại những suy nghĩ đêm qua.',
  'Ngoài hành lang, thị nữ bàn tán nhỏ như chim. Ai cũng muốn biết điều gì đã xảy ra sau trận gió đêm — nhưng nàng chỉ mỉm cười, khom người chào đúng phép, rồi bước đi như không hề có chuyện.',
  'Trong yên tĩnh đó lại là sự cảnh giác căng như dây đàn. Nàng biết một sớm mai bình yên chỉ là màn che: trò chơi vừa mới bắt đầu.',
]

/** slug truyện → số chương → đoạn */
const BODIES: Record<string, Partial<Record<number, string[]>>> = {
  [BI_EP_SLUG]: {
    1: BI_EP_CH1,
    2: BI_EP_CH2,
  },
}

export function getChapterParagraphs(novelSlug: string, chapter: number): string[] {
  const byNovel = BODIES[novelSlug]
  const p = byNovel?.[chapter]
  if (p?.length) return p
  return [
    `Đây là nội dung demo cho Chương ${chapter}. Khi ghép API, đoạn văn thật sẽ hiển thị tại đây.`,
    'Giao diện đọc hỗ trợ phím ←/→ hoặc A/D để chuyển chương (nếu có chương trước/sau).',
  ]
}
