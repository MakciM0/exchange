import { FC, useEffect } from 'react'
import { useAppSelector } from '../../store/AppHooks'

import styles from './WalletPage.module.scss'

interface WalletPageProps {}

const WalletPage: FC<WalletPageProps> = () => {
  const prevCurrencies = useAppSelector(
    (state) => state.exchange.prevCurrencies
  )
  const wallet = useAppSelector((state) => state.exchange.wallet)
  const dollars = useAppSelector((state) => state.exchange.dollars)

  useEffect(() => {
    document.title = "Кошелёк";
  }, []);

  return (
    <div className={styles.wallet}>
      <h2>Мой кошелёк</h2>
      <p>Мои доллары: {dollars} $</p>
      <p>
        Мои криптовалюты:
        {wallet.map((el, index) => (
          <div className={styles.currency} key={index}>
            <p>{el.name}</p>
            <p>{el.amount}</p>
            <p
              className={`${
                prevCurrencies[index].priceUsd < el.priceUsd
                  ? `increased`
                  : prevCurrencies[index].priceUsd > el.priceUsd
                  ? `decreased`
                  : ''
              }`}
            >
              {el.priceUsd} $
            </p>
            <p>Итого: {el.amount * el.priceUsd} $</p>
          </div>
        ))}
      </p>
    </div>
  )
}

export default WalletPage
