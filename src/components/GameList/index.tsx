import React from 'react'
import type { Game } from '../../types'
import styles from './index.module.scss'
import { GameCard } from '../GameCard'

interface GameListProps {
  games: Game[]
}

export const GameList: React.FC<GameListProps> = ({ games }) => (
  <ul className={styles.list}>
    {games.map((game) => (
      <GameCard key={game.gameID} {...game} />
    ))}
  </ul>
)
