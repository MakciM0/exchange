import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import axios from 'axios'
import { base_URL } from '../../Api/Url'

import { useAppDispatch, useAppSelector } from '../../store/AppHooks'
import { SetCurrencies } from '../../store/GameSlice'
import Logo from '../../components/Logo/Logo'

import styles from './MainMenu.module.scss'
import Loading from '../../components/Loading/Loading'

interface MainProps {}

const Main: FC<MainProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(base_URL).then((response) => {
          dispatch(SetCurrencies(response.data.data))
          setIsLoading(true)
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [isLoading])

  useEffect(() => {
    document.title = "Главное меню";
  }, []);

  return (
    <div className={styles.main}>
      <Logo></Logo>
      {isLoading ? (
        <>
          <div className={styles.info}>
            <div className={styles.welcome}>
              <h3>Добро пожаловать</h3>
              <p>
                Всем, кто посетил мою работу. Этот сайт онлайн игра, которую я
                создал для практики в создание сайтов. Этот сайт написан на
                React + Typescript. Состояния хранятся в Redux. Запросы на
                сервер отправляются с помощью Axios. Стили написаны на Scss. Код
                проекта можно посмотреть на github.<a href="https://github.com/MakciM0/exchange">ссылка</a>
              </p>
            </div>
            <div className={styles.rules}>
              <h3>Правила</h3>
              <p>
                Основная цель игры - заработать самый большой капитал в мире.
                Помочь вам в этом сможет криптобиржа. Не забывайте следить за
                показателями персонажа, если энергия упадёт до нуля вы
                проиграете. Покупайте новые дома, чтобы уменьшить снижение
                энергии. Покупайте новые автомобили, чтобы увеличить количество
                действий.
              </p>
            </div>
          </div>
          <NavLink to={'/CreateCharacter'}>Начать игру</NavLink>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  )
}

export default Main
