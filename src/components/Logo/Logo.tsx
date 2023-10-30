import { FC } from 'react'

import styles from './Logo.module.scss'

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <div className={styles.logo}>
      <h1>exchange</h1>
    </div>
  )
}

export default Logo
