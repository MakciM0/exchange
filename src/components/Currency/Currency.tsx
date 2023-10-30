import { FC } from 'react'
import { TCurrency } from '../../types/types'

import styles from './Currency.module.scss'

interface CurrencyProps {
  currency: TCurrency
  prevCurrencies: TCurrency
}

const Currency: FC<CurrencyProps> = ({ currency, prevCurrencies }) => {
  return (
    <div className={styles.currency}>
      <p>
        {currency.name} ({currency.symbol})
      </p>
      <p
        className={`${
          prevCurrencies.priceUsd < currency.priceUsd
            ? `increased`
            : prevCurrencies.priceUsd > currency.priceUsd
            ? `decreased`
            : ''
        }`}
      >
        {currency.priceUsd} $
      </p>
    </div>
  )
}

export default Currency
