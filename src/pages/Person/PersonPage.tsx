import { FC } from 'react'
import { useAppSelector } from '../../store/AppHooks'

import styles from './PersonPage.module.scss'
import Actions from '../../components/Actions/Actions'

interface PersonPageProps {}

const PersonPage: FC<PersonPageProps> = () => {
  const character = useAppSelector((state) => state.exchange.character)
  const characterItems = useAppSelector(
    (state) => state.exchange.characterItems
  )
  const needs = useAppSelector((state) => state.exchange.needs)

  return (
    <div className={styles.person_page}>
      <h2>Мой персонаж</h2>
      <div className={styles.person}>
        <div className={styles.info}>
          <span>{character.name}</span>
          <img src={`./imgs/avatar/${character.img}`} alt={character.name} />
          <Actions></Actions>
        </div>
        <div className={styles.items}>
          <h3>Мои предметы</h3>
          <h4>Мои автомабили</h4>
          {characterItems.cars.map((el, index) => (
            <div key={index} className={styles.car}>
              Название :<p>{el.name}</p>
              Уровень :<p>{el.tier}</p>
            </div>
          ))}
          <h4>Мои Дома</h4>
          {characterItems.houses.map((el, index) => (
            <div key={index} className={styles.house}>
              Название :<p>{el.name}</p>
              Уровень :<p>{el.tier}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.needs}>
        <p>Еда : {needs.food}</p>
        <p>Настроение : {needs.mood}</p>
        <p>Энергия : {needs.energy}</p>
      </div>
    </div>
  )
}

export default PersonPage
