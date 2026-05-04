import { useEffect, useState, type ImgHTMLAttributes } from 'react'

const FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="#e5e5e5" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#888" font-family="Arial,sans-serif" font-size="13">Cover</text></svg>`,
  )

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string }

export function CoverImage({ src, alt, onError, ...rest }: Props) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      decoding="async"
      onError={(e) => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
        onError?.(e)
      }}
    />
  )
}
