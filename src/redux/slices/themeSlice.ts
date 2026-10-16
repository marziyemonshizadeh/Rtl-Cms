import { createSlice } from "@reduxjs/toolkit";
import { readPreference } from "@/lib/themes";

interface DarkmodeState {
  isDarkmode: boolean;
}

const initialState: DarkmodeState = {
  isDarkmode: readPreference("IsDarkMood") === "true",
};

const themeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkmode: (state) => {
      state.isDarkmode = !state.isDarkmode;
    },
  },
});

export const { toggleDarkmode } = themeSlice.actions;

export default themeSlice.reducer;
