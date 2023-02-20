import { createSlice } from "@reduxjs/toolkit"




const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        city: "Kutaisi",
    },
    reducers: {
       setWeatherLocation: (state, action) => {
            return {...state, city: action.payload.city }
       }
    },
})



export const { setWeatherLocation } = weatherSlice.actions;
export default weatherSlice.reducer;

