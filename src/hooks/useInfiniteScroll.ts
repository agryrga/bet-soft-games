import { useState, useCallback, useEffect, useRef } from 'react'
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const hasMoreItems = visibleCount < totalItems
  const canLoadMore = hasMoreItems && !isLoadingMore

  const loadMore = useCallback(() => {
    if (!canLoadMore) return

    setIsLoadingMore(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) => {
        const nextCount = prev + itemsPerLoad
        return Math.min(nextCount, totalItems)
      })
      setIsLoadingMore(false)
      timeoutRef.current = null
    }, loadDelay)
  }, [canLoadMore, itemsPerLoad, totalItems, loadDelay])

  const targetRef = useIntersectionObserver({
    rootMargin,
    threshold,
    onIntersect: loadMore,
    enabled: canLoadMore && totalItems > 0,
  })

  useEffect(() => {
    setVisibleCount(initialCount)
    setIsLoadingMore(false)
  }, [totalItems, initialCount])

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setVisibleCount(initialCount)
    setIsLoadingMore(false)
  }, [initialCount])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    visibleCount,
    isLoadingMore,
    hasMoreItems,
    targetRef,
    reset,
  }
}
