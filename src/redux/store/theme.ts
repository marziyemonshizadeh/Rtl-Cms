import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getSavedTheme, type Theme } from "@/lib/themes";

const initialState: { current: Theme } = { current: getSavedTheme() };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
