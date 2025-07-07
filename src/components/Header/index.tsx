import { SearchInput } from '../SearchInput'
import { FilterSelect } from '../FilterSelect'
import styles from './index.module.scss'

interface HeaderProps {
  options: string[]
}

export const Header: React.FC<HeaderProps> = ({ options }) => {
  return (
    <header className={styles.header}>
      <FilterSelect options={options} />
      <SearchInput />
    </header>
  )
}
