import { FC } from 'react'

import { useAppSelector } from '../../store/AppHooks'

import styles from './BottomBar.module.scss'

interface BottomBarProps {}

const BottomBar: FC<BottomBarProps> = () => {
  const prevCurrencies = useAppSelector(
    (state) => state.exchange.prevCurrencies
  )

  const currencies = useAppSelector((state) => state.exchange.currencies)

  return (
    <div className={styles.bottomBar}>
      <div className={styles.carousel}>
        {currencies.map((el, index) => (
          <>
            <p key={index}>{el.symbol}</p>
            <span
              className={`${
                prevCurrencies[index].priceUsd < el.priceUsd
                  ? `increased`
                  : prevCurrencies[index].priceUsd > el.priceUsd
                  ? `decreased`
                  : ''
              }`}
            >
              {el.priceUsd}
            </span>
          </>
        ))}
      </div>
    </div>
  )
}

export default BottomBar
