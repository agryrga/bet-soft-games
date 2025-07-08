import { useMemo, useEffect } from 'react'
import { useGetGamesQuery } from '../utils/api'
import { GameList } from '../components/GameList'
import { Loader } from '../components/Loader'
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { Divider } from '../components/Divider'

const INITIAL_ITEMS_COUNT = 45
const ITEMS_PER_LOAD = 27

export const MainPage = () => {
  const { data: games, isLoading, isError } = useGetGamesQuery()

  const query = useSelector((state: RootState) =>
    state.search.query.toLowerCase()
  )
  const selectedType = useSelector(
    (state: RootState) => state.filter.selectedType
  )

  const filteredGames = useMemo(() => {
    if (!games) return []

    return games.filter((game) => {
      const name = typeof game.gameName === 'string' ? game.gameName : ''
      const matchesSearch = name.toLowerCase().includes(query)
      const matchesType = selectedType ? game.gameTypeID === selectedType : true
      return matchesSearch && matchesType
    })
  }, [games, query, selectedType])

  const typeOptions = useMemo(() => {
    if (!games) return []

    return Array.from(
      new Set(games.map((game) => game.gameTypeID).filter(Boolean))
    )
  }, [games])

  const { visibleCount, isLoadingMore, hasMoreItems, targetRef, reset } =
    useInfiniteScroll({
      initialCount: INITIAL_ITEMS_COUNT,
      itemsPerLoad: ITEMS_PER_LOAD,
      totalItems: filteredGames.length,
    })

  useEffect(() => {
    reset()
  }, [query, selectedType, reset])

  const displayedGames = useMemo(
    () => filteredGames.slice(0, visibleCount),
    [filteredGames, visibleCount]
  )

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error loading games</div>
      ) : (
        <>
          <Header options={typeOptions} />
          <Divider />

          {filteredGames.length > 0 ? (
            <>
              <GameList games={displayedGames} />

              {isLoadingMore && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <Loader />
                </div>
              )}

              {hasMoreItems && (
                <div
                  ref={targetRef}
                  style={{
                    height: '10px',
                    visibility: 'hidden',
                  }}
                />
              )}
            </>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                color: '#666',
              }}
            >
              Игры не найдены
            </div>
          )}
        </>
      )}
    </section>
  )
}
