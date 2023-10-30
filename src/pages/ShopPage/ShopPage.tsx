import { FC, useState } from 'react'

import { TShop } from '../../types/types'

import { useAppDispatch, useAppSelector } from '../../store/AppHooks'
import { BuyItemInShop } from '../../store/GameSlice'

import { shop } from '../../const/const'

import styles from './ShopPage.module.scss'

interface ShopPageProps {}

const ShopPage: FC<ShopPageProps> = () => {
  const dispatch = useAppDispatch()

  const [activeSection, setActiveSection] = useState<string>('grocery')

  const handleBuy = (
    el: { id: string; name: string; price: number; tier: number },
    section: string
  ) => {
    if (el && section) {
      let itemShop: TShop = {
        id: el.id,
        name: el.name,
        price: el.price,
        tier: el.tier,
        group: activeSection,
      }
      dispatch(BuyItemInShop(itemShop))
    }
  }

  return (
    <div className={styles.shop}>
      <h2>Магазин</h2>
      <div className={styles.sections_title}>
        <button
          className={` ${
            activeSection === `grocery` ? `${styles.active_title}` : ``
          } `}
          onClick={() => {
            setActiveSection('grocery')
          }}
        >
          Магазин продуктов
        </button>
        <button
          className={` ${
            activeSection === `entert` ? `${styles.active_title}` : ``
          } `}
          onClick={() => {
            setActiveSection('entert')
          }}
        >
          Развлечения
        </button>
        <button
          className={` ${
            activeSection === `cars` ? `${styles.active_title}` : ``
          } `}
          onClick={() => {
            setActiveSection('cars')
          }}
        >
          Автосалон
        </button>
        <button
          className={` ${
            activeSection === `houses` ? `${styles.active_title}` : ``
          } `}
          onClick={() => {
            setActiveSection('houses')
          }}
        >
          Дома
        </button>
      </div>
      <div
        className={` ${
          activeSection === `grocery`
            ? `${styles.active_section}`
            : `${styles.section}`
        } `}
      >
        {shop.grocery.map((el) => (
          <div key={el.id} className={styles.grocery}>
            <p>{el.name}</p>
            <img alt={el.name} src={`./imgs/shop/grocery${el.id}.png`}></img>
            <p>{el.price} $</p>
            <button onClick={() => handleBuy(el, activeSection)}>Купить</button>
          </div>
        ))}
      </div>
      <div
        className={` ${
          activeSection === `entert`
            ? `${styles.active_section}`
            : `${styles.section}`
        } `}
      >
        {shop.entertainment.map((el) => (
          <div key={el.id} className={styles.entertainment}>
            <p>{el.name}</p>
            <img alt={el.name} src={`./imgs/shop/entert${el.id}.jpg`}></img>
            <p>
              {el.price === 0
                ? 'Кончается день, тратится энергия'
                : el.price + '$'}
            </p>
            <button onClick={() => handleBuy(el, activeSection)}>
              {el.price === 0 ? 'Следующий день' : 'Отправиться'}
            </button>
          </div>
        ))}
      </div>
      <div
        className={` ${
          activeSection === `cars`
            ? `${styles.active_section}`
            : `${styles.section}`
        } `}
      >
        {shop.cars.map((el) => (
          <div key={el.id} className={styles.car}>
            <p>{el.name}</p>
            <img alt={el.name} src={`./imgs/shop/car${el.id}.png`}></img>
            <p>{el.price} $</p>
            <button onClick={() => handleBuy(el, activeSection)}>Купить</button>
          </div>
        ))}
      </div>
      <div
        className={` ${
          activeSection === `houses`
            ? `${styles.active_section}`
            : `${styles.section}`
        } `}
      >
        {shop.houses.map((el) => (
          <div key={el.id} className={styles.house}>
            <p>{el.name}</p>
            <img alt={el.name} src={`./imgs/shop/house${el.id}.png`}></img>
            <p>{el.price}</p>
            <button onClick={() => handleBuy(el, activeSection)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopPage
