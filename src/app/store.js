import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "../features/decks/deckSlice";
import noteReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    decks: deckReducer,
    notes: noteReducer,
  },
});
