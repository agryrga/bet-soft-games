import styles from './index.module.scss'
import { PragmaticIcon } from '../icons/PragmaticIcon'
export const Divider = () => {
  return (
    <div className={styles.wrapper}>
      <PragmaticIcon />
      <span className={styles.text}>Pragmatic play</span>
    </div>
  )
}
