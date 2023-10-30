import { TdifficultCoefficient } from "../types/types"

export const ImgCharacter = [
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '05.png',
  '06.png',
  '07.png',
  '08.png',
  '09.png',
  '10.png',
  '11.png',
  '12.png',
  '13.png',
  '14.png',
  '15.png',
]

export const shop = {
  grocery: [
    {
      id: '01', //photo src => {grocery${id}.png}
      name: 'Перекус',
      price: 60, //6$ за одну единицу еды
      tier: 1,
    },
    {
      id: '02',
      name: 'Маленький пакет',
      price: 110, // 5.5$
      tier: 2,
    },
    {
      id: '03',
      name: 'Пакет продуктов',
      price: 160, // 5.32$
      tier: 3
    },
    {
      id: '04',
      name: 'Целая корзинка',
      price: 200, //5$
      tier: 4,
    },
    {
      id: '05',
      name: 'Энергитический напиток',
      price: 800, //5$
      tier: 5,
    },
  ],
  cars: [
    {
      id: '01', //photo src => {car${id}.png}
      name: 'Старый хэтчбек',
      price: 50000,
      tier: 1
    },
    {
      id: '02',
      name: 'Хэтчбек',
      price: 350000,
      tier: 2,
    },
    {
      id: '03',
      name: 'Суперкар из прошлого',
      price: 1100000,
      tier: 3
    },
    {
      id: '04',
      name: 'Маслкар',
      price: 3000000,
      tier: 4,
    },
    {
      id: '05',
      name: 'Суперкар',
      price: 6500000,
      tier: 5
    },
    {
      id: '06',
      name: 'Новый суперкар',
      price: 8000000,
      tier: 6
    },
  ],
  houses: [
    {
      id: '02', //photo src => {house${id}.png}
      name: 'Дом на окраине города',
      price: 900000,
      tier: 2
    },
    {
      id: '03',
      name: 'Дом в центре города',
      price: 5000000,
      tier: 3
    },
    {
      id: '04',
      name: 'Дом в элитном районе (обслуживание прилагается)',
      price: 60000000,
      tier: 4
    },
  ],
  entertainment: [
    {
      id: '01', //photo src => {entert${id}.jpg}
      name: 'Прогулка по городу',
      price: 0,
      tier: 1
    },
    {
      id: '02',
      name: 'Сходить в бар',
      price: 200, //2.5$ за одну единицу развлечения
      tier: 2
    },
    {
      id: '03',
      name: 'Посмотреть кино',
      price: 280, //2.33$ за одну единицу развлечения
      tier: 3
    },
  ]
}

export const difficultCoefficientEasy: TdifficultCoefficient = {
  chance: [0.45, 0.85],
  coefficient: [1.15, 1.1, 1.5], //{0: Изменения форбс, 1: изменения валют, 2: изменения потребностей}
  decreaseNeeds: [10, 10, 5]
}
export const difficultCoefficientMedium: TdifficultCoefficient = {
  chance: [0.40, 0.75],
  coefficient: [1.07, 1.07, 2],
  decreaseNeeds: [10, 10, 5]
}
export const difficultCoefficientHard: TdifficultCoefficient = {
  chance: [0.30, 0.70],
  coefficient: [1.05, 1.05, 2],
  decreaseNeeds: [15, 10, 10]
}