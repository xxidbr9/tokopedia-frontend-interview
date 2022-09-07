import { ScreenType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RdxScreenState = {
  screenType: ScreenType;
}

const initialState: RdxScreenState = {
  screenType: 'mobile',
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreenType(state, action: PayloadAction<ScreenType>) {
      state.screenType = action.payload;
    },
  },
});

export const rdxScreenAction = screenSlice.actions;
export const screenReducer = screenSlice.reducer;
