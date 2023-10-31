import { FC, useEffect } from 'react'

import { useAppSelector } from '../../store/AppHooks'

import Currency from '../../components/Currency/Currency'

import styles from './LatestPage.module.scss'

interface LatestPageProps {}

const LatestPage: FC<LatestPageProps> = () => {
  const prevCurrencies = useAppSelector(
    (state) => state.exchange.prevCurrencies
  )
  const currencies = useAppSelector((state) => state.exchange.currencies)

  useEffect(() => {
    document.title = "Стоимость валют";
  }, []);

  return (
    <div className={styles.latestPage}>
      <h2>Текущая стоимость валют</h2>
      <div className={styles.title}>
        <span>Название</span>
        <span>Цена</span>
      </div>
      <div className={styles.currencies}>
        {currencies.map((el, index) => (
          <Currency
            key={index}
            prevCurrencies={prevCurrencies[index]}
            currency={el}
          ></Currency>
        ))}
      </div>
    </div>
  )
}

export default LatestPage
