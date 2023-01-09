import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import deckReducer from "../features/decks/deckSlice";
import noteReducer from "../features/notes/noteSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//object cfg that will be stored in storage
const persistConfig = {
  key: "AnkiManager",
  storage,
};

//combine all reducers
const reducers = combineReducers({
  decks: deckReducer,
  notes: noteReducer,
});

//create a persistent reducer
const persistentReducer = persistReducer(persistConfig, reducers);

//assign the persistent reducer in the store cfg and add
//the dispatch functions to the serializable checks ignore list
export const store = configureStore({
  reducer: persistentReducer,
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
