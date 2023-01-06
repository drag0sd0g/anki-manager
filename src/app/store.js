import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "../features/decks/deckSlice";

export const store = configureStore({
  reducer: {
    decks: deckReducer,
  },
});
