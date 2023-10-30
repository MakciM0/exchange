import { FC } from 'react'
import { useAppSelector } from '../../store/AppHooks'

import styles from './Actions.module.scss'

interface ActionsProps {}

const Actions: FC<ActionsProps> = () => {
  const actions = useAppSelector((state) => state.exchange.actions)

  let numberBlocks = Array(actions.max_value).fill(' ') //Отображение всех действий игрока(пустые)
  if (actions.current_value < numberBlocks.length) {//Отображение текущих действий игрока(заполненные)
    numberBlocks = Array(actions.current_value).fill(' ')
  }

  return (
    <div className={styles.actions}>
      Действия:
      {Array(actions.max_value)
        .fill(' ')
        .map((el, index) => (
          <span key={index}>{el}</span>
        ))}
      <div className={styles.activeBlocks}>
        {numberBlocks.map((el, index) => (
          <span key={index} className={styles.numberBlocks}></span>
        ))}
      </div>
    </div>
  )
}

export default Actions
