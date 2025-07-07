import styles from './index.module.scss'

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
      <p>Загрузка...</p>
    </div>
  )
}
