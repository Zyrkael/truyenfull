/** Hiển thị ~5 sao từ điểm /10 (làm tròn). */
export function RatingStars({ score }: { score: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(score / 2)))

  return (
    <span className="novel-star-row" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? 'novel-star novel-star-full' : 'novel-star novel-star-empty'}>
          ★
        </span>
      ))}
    </span>
  )
}
