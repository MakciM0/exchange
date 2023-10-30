import  { FC } from 'react'
import Forbs from '../Forbs/Forbs'

import { useAppDispatch, useAppSelector } from '../../store/AppHooks'
import { NextDay } from '../../store/GameSlice'

import styles from './RightSideBar.module.scss'

interface RightSideBarProps {}

const RightSideBar: FC<RightSideBarProps> = () => {
  const distapch = useAppDispatch()
  const dollars = useAppSelector((state) => state.exchange.dollars)

  return (
    <div className={styles.RightSideBar}>
      <p>Мои доллары: {dollars} $</p>
      <div className={styles.favorites}>
        {/* выбранные валюты
        В разработке...  */}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            distapch(NextDay())
          }}
        >
          Следующий день
        </button>
      </div>
      <Forbs></Forbs>
    </div>
  )
}

export default RightSideBar
