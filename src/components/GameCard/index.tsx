import React from 'react'
import type { Game } from '../../types'
import styles from './index.module.scss'
import { getGameImageUrl } from '../../utils'

export const GameCard: React.FC<Game> = ({ gameID, gameName }) => {
  return (
    <li key={gameID} className={styles.item}>
      <img
        src={getGameImageUrl(gameID)}
        alt={gameName}
        className={styles.image}
        loading="lazy"
      />
      <p className={styles.title}>{gameName}</p>
    </li>
  )
}
