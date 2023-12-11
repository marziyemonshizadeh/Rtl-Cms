import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DarkmodeState {
  isDarkmode: boolean
}

// Define the initial state using that type
const initialState: DarkmodeState = {
  isDarkmode : false
}

export const darkmodeSlice = createSlice({
  name: 'darkmode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDarkmode: (state) => {
      state.isDarkmode = !state.isDarkmode;
      localStorage.setItem("IsDarkMood", `${state.isDarkmode}`);
    }
  },
})

export const { toggleDarkmode } = darkmodeSlice.actions
 
export default darkmodeSlice.reducer