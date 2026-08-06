import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    className: `rise${visible ? ' in' : ''}`,
    style: { transitionDelay: `${delay}ms` },
  }
}

export function staggerDelay(index: number) {
  return Math.min(index % 5, 3) * 45
}
