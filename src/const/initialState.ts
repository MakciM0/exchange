import { TCharacterItem, TForbs, TCurrency, TWallet } from "../types/types";

export const initialForbs: TForbs[] = [
  {
    name: 'Бенрар Анро',
    worth: 210000000
  },
  {
    name: 'Илона Маска',
    worth: 190000000
  },
  {
    name: 'Джефф Безусов',
    worth: 120000000
  },
  {
    name: 'Неларри Неэлиссон',
    worth: 105000000
  },
  {
    name: 'Ворон Баффет',
    worth: 101000000
  },
  {
    name: 'Биллиус Гейтс',
    worth: 99000000
  },
  {
    name: 'Майка Блумерг',
    worth: 92000000
  },
  {
    name: 'Карлосон Слим',
    worth: 89000000
  },
  {
    name: 'Мукеш Обмани',
    worth: 83000000
  },
  {
    name: 'Стив Ралмеб',
    worth: 81000000
  },
]

export const initialCharacterItems: TCharacterItem = {
  cars: [],
  houses: [
    {
      id: '01', //photo src => {house${id}.png}
      name: 'Родительский дом',
      price: 1,
      tier: 1,
      group: 'houses'
    }
  ]
}

export const nullStateCurrency: TCurrency = {
  id: '',
  rank: 0,
  symbol: '',
  name: '',
  supply: 0,
  maxSupply: 0,
  marketCapUs: 0,
  volumeUsd24Hr: 0,
  priceUsd: 0,
  changePercent24Hr: 0,
  vwap24Hr: 0,
  explorer: '',
}

export const nullStateWallet: TWallet = {
  id: '',
  symbol: '',
  name: '',
  priceUsd: 0,
  amount: 0,
}