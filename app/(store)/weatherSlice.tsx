import { createSlice } from "@reduxjs/toolkit";

interface State {
  city: string;
}

const initialState: State = {
  city: "Kutaisi",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherLocation: (state, action) => {
      return {
        ...state,
        city: action.payload.providedCity,
      };
    },
  },
});

export const { setWeatherLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
