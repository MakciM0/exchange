import { FC, useState, useEffect } from 'react'
import { ImgCharacter } from '../../const/const'

import { useAppDispatch } from '../../store/AppHooks'
import { StartGame } from '../../store/GameSlice'

import styles from './CreateCharacter.module.scss'

interface CreateCharacterProps {}

const CreateCharacter: FC<CreateCharacterProps> = () => {
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState<string>('')
  const [difficult, setDifficult] = useState<string>('')
  const [userPhoto, setUserPhoto] = useState<string>('')

  const [selectedName, setSelectedName] = useState<boolean>(false)
  const [selecteDifficult, setSelecteDifficult] = useState<boolean>(false)
  const [selectedPhoto, setSelectedPhoto] = useState<boolean>(false)

  const handleStart = (e: boolean) => {
    if (userName && difficult && userPhoto) {
      dispatch(StartGame([e, userName, userPhoto, difficult]))
    }
    if (!userName) {
      //Анимация если не выбрано
      setSelectedName(true)
      setTimeout(() => {
        setSelectedName(false)
      }, 3000)
    }
    if (!difficult) {
      setSelecteDifficult(true)
      setTimeout(() => {
        setSelecteDifficult(false)
      }, 3000)
    }
    if (!userPhoto) {
      setSelectedPhoto(true)
      setTimeout(() => {
        setSelectedPhoto(false)
      }, 3000)
    }
  }

  useEffect(() => {
    document.title = 'Создание персонажа'
  }, [])

  return (
    <div className={styles.create_character}>
      <div className={styles.title}>
        <h2>Создание персонажа</h2>
      </div>
      <div className={styles.name}>
        <span>Ваше имя:</span>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        ></input>
        <div
          className={`${
            selectedName ? ` ${styles.modal_animation} ` : `${styles.modal}`
          }`}
        >
          <p> Выберите Имя</p>
        </div>
      </div>
      <div className={styles.photos}>
        <span>Выберите фото:</span>
        <div className={styles.imgs}>
          {ImgCharacter.map((src, index) => (
            <img
              key={index}
              className={`${userPhoto === src ? `activePhoto` : ''}`}
              onClick={() => setUserPhoto(src)}
              alt="src"
              src={`./imgs/avatar/${src}`}
            ></img>
          ))}
        </div>
        <div
          className={`${
            selectedPhoto ? ` ${styles.modal_animation} ` : `${styles.modal}`
          }`}
        >
          <p> Выберите Фото</p>
        </div>
      </div>
      <div className={styles.difficult}>
        <p>Выберите сложность:</p>
        <div className={styles.difficult_label}>
          <label htmlFor="difficult_easy">Легко</label>
          <input
            onClick={() => setDifficult('easy')}
            type="radio"
            name="difficult"
            id="difficult_easy"
          />
          <span>?</span>
          <p className={styles.prompt}>
            Стоимость валют изменяется быстрее. Потребности растут меньше.
          </p>
        </div>
        <div className={styles.difficult_label}>
          <label htmlFor="difficult_medium">Средне</label>
          <input
            onClick={() => setDifficult('medium')}
            type="radio"
            name="difficult"
            id="difficult_medium"
          />
          <span>?</span>
          <p className={styles.prompt}>
            Стоимость валют изменяется cтандартно. Потребности растут умеренно.
          </p>
        </div>
        <div className={styles.difficult_label}>
          <label htmlFor="difficult_hard">Сложно</label>
          <input
            onClick={() => setDifficult('hard')}
            type="radio"
            name="difficult"
            id="difficult_hard"
          />
          <span>?</span>
          <p className={styles.prompt}>
            Стоимость валют изменяется медленнее. Потребности растут быстро.
          </p>
        </div>
        <div
          className={`${
            selecteDifficult ? ` ${styles.modal_animation} ` : `${styles.modal}`
          }`}
        >
          <p> Выберите сложность</p>
        </div>
      </div>

      <button onClick={() => handleStart(true)}>Начать игру</button>
    </div>
  )
}

export default CreateCharacter
