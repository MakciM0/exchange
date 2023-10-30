import { FC, useState, useEffect } from 'react'

import { TWallet } from '../../types/types'
import { nullStateWallet } from '../../const/initialState'

import { SellForDollars } from '../../store/GameSlice'
import { useAppSelector, useAppDispatch } from '../../store/AppHooks'

import styles from './ChangeSellForDollars.module.scss'

interface ChangeSellForDollarsProps {}

const ChangeSellForDollars: FC<ChangeSellForDollarsProps> = () => {
  const [amount, setAmount] = useState<number>(0)
  const [currentCurrency, setCurrentCurrency] = useState<TWallet>(
    nullStateWallet
  )
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const wallet = useAppSelector((state) => state.exchange.wallet)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentCurrency.id && totalPrice) {
      let value = totalPrice / currentCurrency.priceUsd
      setAmount(value)
    }
  }, [currentCurrency, totalPrice])

  const SellAll = () => {
    const isFind = wallet.find((item) => item.id === currentCurrency.id)
    if (isFind) {
      setAmount(isFind.amount)
      let total = isFind.amount * isFind.priceUsd
      setTotalPrice(total)
    }
  }

  const handleSell = () => {
    const isFind = wallet.find((item) => item.id === currentCurrency.id)
    const currency: TWallet = {
      id: currentCurrency.id,
      symbol: currentCurrency.symbol,
      name: currentCurrency.name,
      priceUsd: currentCurrency.priceUsd,
      amount: amount,
    }
    if (amount > 0 && totalPrice > 0) {
      if (isFind && isFind.amount * isFind.priceUsd >= totalPrice) {
        dispatch(SellForDollars(currency))
      }
    }
  }

  return (
    <div className={styles.sell}>
      <div className={styles.changeDollars}>
        <span>Продать за $</span>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => {
            setTotalPrice(Number(e.target.value))
          }}
        ></input>
      </div>
      <div className={styles.changeUnits}>
        <span>Продать в количестве</span>
        <p>{amount}</p>
        <button onClick={() => SellAll()}>Всё</button>
      </div>

      <div className={styles.currencies}>
        <input value={currentCurrency.name}></input>
        <div className={styles.currencies_list}>
          {wallet.map((el, index) => (
            <div
              key={index}
              onClick={() => setCurrentCurrency(el)}
              className={styles.currency}
            >
              <p>{el.name}</p>
              <p>({el.amount})</p>
              <p>{el.priceUsd}</p>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.sell_button} onClick={() => handleSell()}>
        Продать
      </button>
    </div>
  )
}

export default ChangeSellForDollars
