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

//Redux async action/thunk for getting all deck names and Ids
export const getDeckNamesAndIds = createAsyncThunk(
  "decks/getAll",
  async (_, thunkAPI) => {
    try {
      return await deckService.getDeckNamesAndIds();
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
      .addCase(getDeckNamesAndIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeckNamesAndIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.result) {
          let updatedDecks = [];
          for (const [key, value] of Object.entries(action.payload.result)) {
            updatedDecks.push({ deckId: value, deckName: key });
          }
          state.decks = updatedDecks;
        }
      })
      .addCase(getDeckNamesAndIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export default deckSlice.reducer;
export const { deckSelected } = deckSlice.actions;
