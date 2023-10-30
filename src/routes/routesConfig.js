import Main from '../pages/Main/MainMenu'
import PersonPage from '../pages/Person/PersonPage'
import LatestPage from '../pages/LatestPage/LatestPage'
import ChangePage from '../pages/ChangePage/ChangePage'
import ShopPage from '../pages/ShopPage/ShopPage'
import WalletPage from '../pages/WalletPage/WalletPage'
import CreateCharacter from '../pages/CreateCharacter/CreateCharacter'
import Job from '../pages/Job/Job'

const routesConfig = [
  {
    path: '/Person',
    element: <PersonPage></PersonPage>,
  },
  {
    path: '/LatestPage',
    element: <LatestPage></LatestPage>,
  },
  {
    path: '/ChangePage',
    element: <ChangePage></ChangePage>,
  },
  {
    path: '/ShopPage',
    element: <ShopPage></ShopPage>,
  },
  {
    path: '/WalletPage',
    element: <WalletPage></WalletPage>,
  },
  {
    path: '/Job',
    element: <Job></Job>,
  },
  {
    path: '*',
    element: <PersonPage></PersonPage>,
  },
  // Error
]

export const routesConfigMainMenu = [
  {
    path: '/Main',
    element: <Main></Main>,
  },
  {
    path: '/CreateCharacter',
    element: <CreateCharacter></CreateCharacter>,
  },
  {
    path: '*',
    element: <Main></Main>,
  },

  //error
]

export default routesConfig
