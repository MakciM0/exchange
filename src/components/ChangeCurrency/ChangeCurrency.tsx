import { FC, useState, useEffect } from 'react'
import { TCurrency, TWallet } from '../../types/types'
import { nullStateWallet, nullStateCurrency } from '../../const/initialState'
import { ChangeCurrencyReducer } from '../../store/GameSlice'
import { useAppDispatch } from '../../store/AppHooks'

import styles from './ChangeCurrency.module.scss'

interface ChangeCurrencyProps {
  wallet: TWallet[]
  currencies: TCurrency[]
}

const ChangeCurrency: FC<ChangeCurrencyProps> = ({ wallet, currencies }) => {
  const dispatch = useAppDispatch()

  const [currentUserCurrency, setCurrentUserCurrency] = useState<TWallet>(
    nullStateWallet
  )
  const [currentCurrency, setCurrentCurrency] = useState<TCurrency>(
    nullStateCurrency
  )
  const [openCurenncies, setOpenCurrencies] = useState<boolean>(false)

  const [userAmount, setUserAmount] = useState<number>(1)
  const [currencyAmount, setCurrencyAmount] = useState<number>(1)

  useEffect(() => {
    if (currentUserCurrency && currentCurrency) {
      let PriceUserCurrency = 0
      let PriceCurrency = 0
      let total = 0

      PriceUserCurrency = userAmount * currentUserCurrency.priceUsd
      PriceCurrency = currentCurrency.priceUsd

      total = PriceUserCurrency / PriceCurrency
      setCurrencyAmount(total)
    }
  }, [currentUserCurrency, currentCurrency, userAmount, currencyAmount])

  const handleBuy = () => {
    if (currentUserCurrency && currentCurrency) {
      let isFind = wallet.find((item) => item.id === currentUserCurrency.id)
      if (isFind && isFind.amount >= userAmount) {
        dispatch(
          ChangeCurrencyReducer([
            isFind,
            currentCurrency,
            userAmount,
            currencyAmount,
          ])
        )
      }
    }
  }

  return (
    <div className={styles.change}>
      <div className={styles.currencies_wrapper}>
        <div className={styles.user_currencies}>
          <input value={currentUserCurrency.name}></input>
          <div className={styles.currencies_list}>
            {wallet.map((el, index) => (
              <div
                key={index}
                onClick={() => setCurrentUserCurrency(el)}
                className={styles.currency}
              >
                <p>{el.name}</p>
                <p>({el.amount})</p>
                <p>{el.priceUsd}</p>
              </div>
            ))}
          </div>
        </div>
        <span>Поменять валюту</span>
        <div className={styles.currencies}>
          <input value={currentCurrency.name}></input>
          <button onClick={() => setOpenCurrencies(!openCurenncies)}>\/</button>
          <div className={styles.currencies_list}>
            {openCurenncies
              ? currencies.map((el, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentCurrency(el)}
                    className={styles.currency}
                  >
                    <p>{el.name}</p>
                    <p>{el.priceUsd}</p>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>

      <div className={styles.amount}>
        <div>
          <input
            onChange={(e) => setUserAmount(Number(e.target.value))}
            type="number"
            value={userAmount}
          />
        </div>
        <span>В количестве</span>
        <div>
          <p>{currencyAmount > 0 && userAmount > 0 ? currencyAmount : ''}</p>
        </div>
      </div>

      <div className={styles.button}>
        <button onClick={() => handleBuy()}>Купить</button>
      </div>
    </div>
  )
}

export default ChangeCurrency
