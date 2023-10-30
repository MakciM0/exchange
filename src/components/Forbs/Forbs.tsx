import { FC, useState } from 'react'

import { useAppSelector } from '../../store/AppHooks'

import styles from './Forbs.module.scss'

interface ForbsProps {}

const Forbs: FC<ForbsProps> = () => {
  const forbs = useAppSelector((state) => state.exchange.forbs)
  const dollars = useAppSelector((state) => state.exchange.dollars)

  const [openForbs, setOpenForbs] = useState<boolean>(false)

  return (
    <div className={styles.forbs}>
      <button onClick={() => setOpenForbs(!openForbs)}>Forbs</button>
      {openForbs ? (
        <div className={styles.list}>
          <p>Список Forbs</p>
          {forbs.map((el) => (
            <p>
              {el.name} {el.worth.toFixed(3)}
            </p>
          ))}
          <p>Ваши доллары: {dollars} $</p>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Forbs
