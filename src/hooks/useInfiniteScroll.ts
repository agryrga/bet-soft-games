import { useState, useCallback, useEffect } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

interface UseInfiniteScrollOptions {
  initialCount: number
  itemsPerLoad: number
  totalItems: number
  loadDelay?: number
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  initialCount,
  itemsPerLoad,
  totalItems,
  loadDelay = 300,
  rootMargin = '400px',
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const hasMoreItems = visibleCount < totalItems
  const canLoadMore = hasMoreItems && !isLoadingMore

  const loadMore = useCallback(() => {
    if (!canLoadMore) return

    setIsLoadingMore(true)

    const timeoutId = setTimeout(() => {
      setVisibleCount((prev) => {
        const nextCount = prev + itemsPerLoad
        return Math.min(nextCount, totalItems)
      })
      setIsLoadingMore(false)
    }, loadDelay)

    return () => clearTimeout(timeoutId)
  }, [canLoadMore, itemsPerLoad, totalItems, loadDelay])

  const targetRef = useIntersectionObserver({
    rootMargin,
    threshold,
    onIntersect: loadMore,
    enabled: canLoadMore,
  })

  useEffect(() => {
    setVisibleCount(initialCount)
    setIsLoadingMore(false)
  }, [totalItems, initialCount])

  const reset = useCallback(() => {
    setVisibleCount(initialCount)
    setIsLoadingMore(false)
  }, [initialCount])

  return {
    visibleCount,
    isLoadingMore,
    hasMoreItems,
    targetRef,
    reset,
  }
}
