import { FC, useState, useEffect } from 'react'

import { useAppSelector } from '../../store/AppHooks'

import styles from './ChangePage.module.scss'
import ChangeBuyForDollars from '../../components/BuyForDollars/ChangeBuyForDollars'
import ChangeSellForDollars from '../../components/SellForDollars/ChangeSellForDollars'
import ChangeCurrency from '../../components/ChangeCurrency/ChangeCurrency'

interface ChangePageProps {}

const ChangePage: FC<ChangePageProps> = () => {
  const [isChange, setIsChange] = useState<boolean>(false)

  const wallet = useAppSelector((state) => state.exchange.wallet)
  const currencies = useAppSelector((state) => state.exchange.currencies)

  useEffect(() => {
    document.title = "Обмен валюты";
  }, []);

  return (
    <div className={styles.changePage}>
      <h2>Обмен валюты</h2>
      <div className={styles.buttons}>
        <button onClick={() => setIsChange(true)}>Поменять валюту</button>
        <button onClick={() => setIsChange(false)}>
          Купить/Продать валюту
        </button>
      </div>

      {isChange ? (
        <div className={styles.change}>
          <ChangeCurrency
            wallet={wallet}
            currencies={currencies}
          ></ChangeCurrency>
        </div>
      ) : (
        <>
          <ChangeBuyForDollars></ChangeBuyForDollars>
          <ChangeSellForDollars></ChangeSellForDollars>
        </>
      )}
    </div>
  )
}

export default ChangePage
