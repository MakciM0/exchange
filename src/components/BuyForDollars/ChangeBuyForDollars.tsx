import { FC, useEffect, useState } from 'react'

import { TCurrency, TWallet } from '../../types/types'
import { nullStateCurrency } from '../../const/initialState'

import { BuyForDollars } from '../../store/GameSlice'
import { useAppSelector, useAppDispatch } from '../../store/AppHooks'

import styles from './ChangeBuyForDollars.module.scss'

interface ChangeBuyForDollars {}

const ChangeBuyForDollars: FC<ChangeBuyForDollars> = () => {

  const [openCurenncies, setOpenCurrencies] = useState<boolean>(false)

  const [amount, setAmount] = useState<number>(0)
  const [currentCurrency, setCurrentCurrency] = useState<TCurrency>(nullStateCurrency)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const currencies = useAppSelector((state) => state.exchange.currencies)
  const dollars = useAppSelector((state) => state.exchange.dollars)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentCurrency.id && totalPrice) {
      let value = totalPrice / currentCurrency.priceUsd
      setAmount(value)
    }
  }, [currentCurrency, totalPrice])

  const handleBuy = () => {
    const currency: TWallet = {
      id: currentCurrency.id,
      symbol: currentCurrency.symbol,
      name: currentCurrency.name,
      priceUsd: currentCurrency.priceUsd,
      amount: amount,
    }
    if (amount > 0 && totalPrice > 0) {
      if (dollars >= totalPrice) {
        dispatch(BuyForDollars(currency))
      }
    }
  }

  return (
    <div className={styles.buy}>
      <div className={styles.changeDollars}>
        <span>Купить за $</span>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => {
            setTotalPrice(Number(e.target.value))
          }}
        ></input>
      </div>
      <div className={styles.changeUnits}>
        <span>Купить в количестве</span>
        <p>{amount}</p>
      </div>
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
      <button className={styles.submit} onClick={() => handleBuy()}>
        Купить
      </button>
    </div>
  )
}

export default ChangeBuyForDollars
