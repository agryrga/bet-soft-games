import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setFilter } from '../../store/filterSlice'
import styles from './index.module.scss'

interface FilterSelectProps {
  options: string[]
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ options }) => {
  const dispatch = useDispatch()
  const selectedType = useSelector(
    (state: RootState) => state.filter.selectedType
  )

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value))
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>Game Type</span>
      <select
        className={styles.select}
        value={selectedType}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}
