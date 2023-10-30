import { TCurrency, TWallet, TCharacter, TActions, TForbs, TdifficultCoefficient, TNeeds, TShop, TCharacterItem } from "./../types/types";
import { difficultCoefficientEasy, difficultCoefficientMedium, difficultCoefficientHard } from "../const/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { initialForbs, initialCharacterItems } from "../const/initialState";


const GameSlice = createSlice({
  name: "game",
  initialState: {
    inGame: false as boolean, //В Product false
    currencies: [] as TCurrency[], //Текущие валюты
    prevCurrencies: [] as TCurrency[], //Вчерашние валюты
    wallet: [] as TWallet[], //Кошелёк игрока
    dollars: 2000 as number, //Деньги игрока
    character: {} as TCharacter, // Персонаж
    characterItems: initialCharacterItems as TCharacterItem,// Предметы игрока
    needs: { food: 100, energy: 100, mood: 100 } as TNeeds, //Потребности персонажа
    coefficient: {} as TdifficultCoefficient, //Скорость изменения от сложности
    actions: { max_value: 2, current_value: 2 } as TActions, //Дейсвия игрока (максимум 8)
    days: 1 as number, //Текущий день
    forbs: initialForbs as TForbs[], // Список Forbs
    win: false as boolean //Победа игрока
  },

  reducers: {
    StartGame: (state, action: PayloadAction<[startUser: boolean, nameUser: string, photoUser: string, difficultUser: string]>) => {
      state.inGame = action.payload[0]
      state.character = {
        name: action.payload[1],
        img: action.payload[2],
        difficult: action.payload[3]
      }

      state.prevCurrencies = state.currencies
      if (state.character.difficult === 'easy') {
        state.coefficient = difficultCoefficientEasy
      }
      if (state.character.difficult === 'medium') {
        state.coefficient = difficultCoefficientMedium
      }
      if (state.character.difficult === 'hard') {
        state.coefficient = difficultCoefficientHard
      }

    },
    SetCurrencies: (state, action: PayloadAction<TCurrency[]>) => {
      state.currencies = action.payload;
      state.currencies.forEach((item, i) => {
        const number = Number(item.priceUsd).toFixed(4)
        state.currencies[i].priceUsd = Number(number);
      })
    },
    BuyForDollars: (state, action: PayloadAction<TWallet>) => {
      const isFind = state.wallet.find((item) => item.id === action.payload.id)
      if (state.actions.current_value >= 1) {
        if (isFind) {
          isFind.amount += action.payload.amount;
        } else {
          state.wallet.push(action.payload);
        }
        state.actions.current_value = state.actions.current_value - 1;
        state.dollars = (state.dollars - (action.payload.amount * action.payload.priceUsd))
      }
    },
    SellForDollars: (state, action: PayloadAction<TWallet>) => {
      if (state.actions.current_value >= 1) {
        state.actions.current_value = state.actions.current_value - 1;
        const isFind = state.wallet.find((item) => item.id === action.payload.id)
        if (isFind && (isFind.amount === action.payload.amount)) {
          state.wallet = state.wallet.filter((item) => item.id !== action.payload.id);
        }
        if (isFind && (isFind.amount >= action.payload.amount)) {
          isFind.amount = isFind.amount - action.payload.amount;
        }
        state.dollars = state.dollars + (action.payload.amount * action.payload.priceUsd)
      }
    },
    ChangeCurrencyReducer: (state, action: PayloadAction<[UserCurrency: TWallet, Currency: TCurrency, Amount: number, CurrencyAmount: number]>) => {
      const isFindUserCurrency = state.wallet.find((item) => item.id === action.payload[0].id)
      if (state.actions.current_value >= 1) {
        state.actions.current_value = state.actions.current_value - 1;

        if (isFindUserCurrency) {
          if (isFindUserCurrency.amount - action.payload[2] === 0) {
            state.wallet = state.wallet.filter((item) => item.id !== isFindUserCurrency.id);
          } else {
            isFindUserCurrency.amount = isFindUserCurrency.amount - action.payload[2]
          }
        }

        const isFind = state.wallet.find((item) => item.id === action.payload[1].id)
        if (isFind) {
          isFind.amount += action.payload[3];
        } else {
          const isFindCurrency = state.currencies.find((item) => item.id === action.payload[1].id)
          if (isFindCurrency) {
            state.wallet.push({
              id: isFindCurrency.id,
              symbol: isFindCurrency.symbol,
              name: isFindCurrency.name,
              priceUsd: isFindCurrency.priceUsd,
              amount: action.payload[3]
            })
          }
        }
      }
    },
    BuyItemInShop: (state, action: PayloadAction<TShop>) => { // Покупка в магазине
      console.log(action.payload)
      if (state.dollars >= action.payload.price) {
        if (action.payload.group === 'grocery') {
          if (action.payload.tier === 5) { //Если энергетик
            state.needs.energy += 10
          } else
            if ((state.needs.food + action.payload.tier * 10) > 100) {//Если продукты
              state.needs.food = 100
            } else {
              state.needs.food += action.payload.tier * 10
            }
          state.dollars -= action.payload.price
        }
        if (action.payload.group === 'entert') {
          if (action.payload.tier === 1) { // Прогулка по городу
            if ((state.needs.mood + 15) > 100) {
              state.needs.mood = 100 + state.coefficient.decreaseNeeds[2]
            } else {
              state.needs.mood += 15
            }
            GameSlice.caseReducers.NextDay(state);
          } else if ((state.needs.mood + action.payload.tier * 20) > 100) { //Если другие развлечения
            state.needs.mood = 100
          } else {
            state.needs.mood += action.payload.tier * 20
          }
          state.dollars -= action.payload.price
        }
        if (action.payload.group === 'cars') {
          const isFind = state.characterItems.cars.find((el) => el.id === action.payload.id)
          if (!isFind) {
            state.characterItems.cars.push(action.payload)
            state.dollars -= action.payload.price
            const allTiers = state.characterItems.cars.map((el) => el.tier)
            const maxTier = Math.max.apply(null, allTiers)
            state.actions.max_value = maxTier + 2;
          }
        }
        if (action.payload.group === 'houses') {
          const isFind = state.characterItems.houses.find((el) => el.id === action.payload.id)
          if (!isFind) {
            state.characterItems.houses.push(action.payload)
            state.dollars -= action.payload.price
          }
        }
      }
    },
    NextDay: (state) => { //Следующий день
      state.days += 1;
      state.actions.current_value = state.actions.max_value;

      // Обновление валюты
      state.prevCurrencies.forEach((item, index) => {//Прошлая цена валют
        item.priceUsd = state.currencies[index].priceUsd
      })
      state.currencies.forEach((item) => { //Изменение валюты
        let change = Math.random()
        if (change > 0.7) {
          item.priceUsd *= state.coefficient.coefficient[1]
        } else if (change < 0.3) {
          item.priceUsd /= state.coefficient.coefficient[1]
        }
      })
      state.wallet.forEach((item, index) => {//Изменение цены в кошельке игрока
        let isFind = state.currencies.find((el) => el.id === item.id)
        if(isFind){
          item.priceUsd = isFind?.priceUsd
        }
        // item.priceUsd = state.currencies[index].priceUsd
      })
      state.forbs.forEach((item) => {// Изменения Форбс
        let change = Math.random()
        if (change > state.coefficient.chance[1]) {
          item.worth *= state.coefficient.coefficient[0]
        } else if (change < state.coefficient.chance[0]) {
          item.worth /= state.coefficient.coefficient[0]
        }
        if (item.worth < state.dollars) {
          state.win = true
        }
      })

      //Сортировка
      const mapped = state.forbs.map((el, index) => { return { index: index, value: el.worth, name: el.name } })
      mapped.sort((a, b) => {
        if (a.value > b.value) return -1
        if (a.value < b.value) {
          return 1;
        }
        return 0;
      })
      state.forbs.forEach((item, index) => {
        state.forbs[index] = {
          name: mapped[index].name,
          worth: mapped[index].value
        }
      })

      //Изменение потребностей
      let food = 0;
      let mood = 0;
      if (state.needs.food < 30) { //Вычесляем уменьшение энергии от еды
        food = state.coefficient.decreaseNeeds[0] * state.coefficient.coefficient[2]
      } else if ((state.needs.food > 30) && (state.needs.food < 70)) {
        food = state.coefficient.decreaseNeeds[0]
      }
      if (state.needs.mood < 30) { //Вычесляем уменьшение энергии от настроения
        mood = state.coefficient.decreaseNeeds[2] * state.coefficient.coefficient[2]
      } else if ((state.needs.mood > 30) && (state.needs.mood < 70)) {
        mood = state.coefficient.decreaseNeeds[2]
      }
      const allTiers = state.characterItems.houses.map((el) => el.tier)
      const maxTier = Math.max.apply(null, allTiers)
      state.needs.energy += maxTier * 10;
      state.needs.energy = state.needs.energy - state.coefficient.decreaseNeeds[1] - food - mood
      if (state.needs.energy > 100) {
        state.needs.energy = 100
      }
      state.needs.food -= state.coefficient.decreaseNeeds[0]
      if (state.needs.food < 0) {
        state.needs.food = 0
      }
      state.needs.mood -= state.coefficient.decreaseNeeds[2]
      if (state.needs.mood < 0) {
        state.needs.mood = 0
      }
      if (maxTier === 4) { //максимальный tier дома
        state.needs.mood = 100
        state.needs.food = 100
        state.needs.energy = 100
      }
      if (state.needs.energy <= 0) alert('Вы проиграли')//Проверка на поражение

      if (state.win) alert('Вы победили')//Проверка на победу
    }
  },
});

export const {
  StartGame,
  SetCurrencies,
  BuyForDollars,
  SellForDollars,
  ChangeCurrencyReducer,
  NextDay,
  BuyItemInShop,

} = GameSlice.actions;
export const selectCount = (state: RootState) => state.exchange;
export default GameSlice.reducer;
