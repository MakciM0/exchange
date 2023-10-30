export type TCurrency = {
  id: string,
  rank: number,
  symbol: string,
  name: string,
  supply: number,
  maxSupply: number,
  marketCapUs: number,
  volumeUsd24Hr: number,
  priceUsd: number,
  changePercent24Hr: number,
  vwap24Hr: number,
  explorer: string
}
export type TWallet = {
  id: string,
  symbol: string,
  name: string,
  priceUsd: number,
  amount: number
}
export type TCharacter = {
  name: string,
  img: string,
  difficult: string,
}
export type TCharacterItem = {
  cars: TShop[],
  houses: TShop[]
}
export type TNeeds = {
  food: number,
  energy: number,
  mood: number
}
export type TActions = {
  max_value: number,
  current_value: number
}
export type TForbs = {
  name: string,
  worth: number
}
export type TShop = {
  id: string,
  name: string,
  price: number,
  tier: number,
  group: string
}
export type TdifficultCoefficient = {
  chance: [
    min: number,
    max: number,
  ],
  coefficient: [
    forbs: number,
    currency: number,
    needs: number,
  ]
  decreaseNeeds: [
    food: number,
    energy: number,
    mood: number
  ]
}
