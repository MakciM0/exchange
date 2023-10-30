import { FC } from 'react'

import styles from './Loading.module.scss'

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className={styles.loading_wrapper}>
      <span>Loading</span>
      <div className={styles.loading}></div>
    </div>
  )
}

export default Loading
