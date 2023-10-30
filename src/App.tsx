import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routesConfig, { routesConfigMainMenu } from './routes/routesConfig'

import { useAppSelector } from './store/AppHooks'

import NavMenu from './components/NavMenu/NavMenu'
import RightSideBar from './components/RightSideBar/RightSideBar'

import styles from './App.module.scss'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import BottomBar from './components/BottomBar/BottomBar'

const App: React.FC = () => {
  const inGame = useAppSelector((state) => state.exchange.inGame)

  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
        {inGame ? ( //Если внутри игры
          <>
            <LeftSideBar></LeftSideBar>
            <div className={styles.middleWrapper}>
              <NavMenu></NavMenu>
              <Routes>
                {routesConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  ></Route>
                ))}
              </Routes>
            </div>
            <RightSideBar></RightSideBar>
            <BottomBar></BottomBar>
          </>
        ) : ( // Если в главном меню
          <Routes>
            {routesConfigMainMenu.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              ></Route>
            ))}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
