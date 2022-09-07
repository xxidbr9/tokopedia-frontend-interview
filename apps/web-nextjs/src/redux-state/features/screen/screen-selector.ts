import { RootState } from "@/redux-state";

const IsMobile = (state: RootState) => state.screenReducer.screenType === 'mobile' || state.screenReducer.screenType === 'tablet';

export const rdxScreenSelector = {
  IsMobile,
};