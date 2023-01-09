import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deckService from "./deckService";

const initialState = {
  selectedDeck: "",
  decks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Redux async action/thunk for getting all decks
export const getDecks = createAsyncThunk(
  "decks/getAll",
  async (_, thunkAPI) => {
    try {
      //Get deck names and IDs
      const deckNamesAndIds = await deckService.getDeckNamesAndIds();
      let deckNames = [];
      for (const [key] of Object.entries(deckNamesAndIds.result)) {
        deckNames.push(key);
      }
      //Augment this data with the deck stats
      const deckStats = await deckService.getDeckStats(deckNames);
      let updatedDecks = [];
      for (const [key, value] of Object.entries(deckStats.result)) {
        updatedDecks.push({
          deckId: key,
          deckName: value.name,
          total_in_deck: value.total_in_deck,
          new_count: value.new_count,
          learn_count: value.learn_count,
          review_count: value.review_count,
        });
      }
      return updatedDecks;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    deckSelected: {
      reducer(state, action) {
        state.selectedDeck = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decks = action.payload;
      })
      .addCase(getDecks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export default deckSlice.reducer;
export const { deckSelected } = deckSlice.actions;
