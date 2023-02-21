import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import weatherSlice from "./weatherSlice";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
const store = configureStore({
  reducer: {
    weather: weatherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const wrapper = createWrapper(() => store);
export const weatherStore = store;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
