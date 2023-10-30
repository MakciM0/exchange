import { configureStore } from "@reduxjs/toolkit";
import GameSlice from "./GameSlice";

const store = configureStore({
  reducer: {
    exchange: GameSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
