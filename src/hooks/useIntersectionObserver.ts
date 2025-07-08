import { useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  rootMargin?: string
  threshold?: number
  onIntersect: () => void
  enabled?: boolean
}

export const useIntersectionObserver = ({
  rootMargin = '0px',
  threshold = 0.1,
  onIntersect,
  enabled = true,
}: UseIntersectionObserverOptions) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && enabled) {
        onIntersect()
      }
    },
    [onIntersect, enabled]
  )

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (!enabled || !targetRef.current) return

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold,
    })

    const currentTarget = targetRef.current
    if (currentTarget && observerRef.current) {
      observerRef.current.observe(currentTarget)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [handleIntersect, rootMargin, threshold, enabled])

  return targetRef
}
