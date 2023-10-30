import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './NavMenu.module.scss'

interface NavMenuProps {}

const NavMenu: FC<NavMenuProps> = () => {
  return (
    <nav className={styles.NavMenu}>
      <NavLink to={'/LatestPage'}>Котировки криптовалют</NavLink>
      <NavLink to={'/ChangePage'}>Биржа</NavLink>
      {/* <NavLink to={'/Main'}>Main</NavLink> For dev */}
      <NavLink to={'/ShopPage'}>Магазин</NavLink>
      <NavLink to={'/WalletPage'}>Кошелёк</NavLink>
      <NavLink to={'/HomePage'}>Персонаж</NavLink>
      <NavLink to={'/Job'}>Подработка</NavLink>
    </nav>
  )
}

export default NavMenu
