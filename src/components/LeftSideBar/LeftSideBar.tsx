import { FC } from 'react'
import Actions from '../Actions/Actions'
import { useAppSelector } from '../../store/AppHooks'
import styles from './LeftSideBar.module.scss'

interface LeftSideBarProps {}

const LeftSideBar: FC<LeftSideBarProps> = () => {
  const actions = useAppSelector((state) => state.exchange.actions)
  const needs = useAppSelector((state) => state.exchange.needs)
  const character = useAppSelector((state) => state.exchange.character)
  const days = useAppSelector((state) => state.exchange.days)

  return (
    <div className={styles.LeftSideBar}>
      <div className={styles.character}>
        <p>
          {character.name} ({character.difficult})
        </p>
        <div className={styles.needs}>
          <p>Еда : {needs.food}</p>
          <p>Настроение : {needs.mood}</p>
          <p>Энергия : {needs.energy}</p>
        </div>
        <p>Текущий день: {days}</p>
      </div>
      <div className={styles.actions}>
        {actions.max_value < 5 ? (
          <Actions></Actions>
        ) : (
          <>
            {actions.current_value}/{actions.max_value}
          </>
        )}
      </div>
    </div>
  )
}

export default LeftSideBar
