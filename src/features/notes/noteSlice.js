import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Redux async action/thunk for getting all notes
//We need two calls to the backend for this, first to get all note IDs from a deck
//Then to batch-fetch all note info by the IDs we fetched in the first call
export const getNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (deckId, thunkAPI) => {
    try {
      const noteIdArr = await noteService.getNotesForDeck(deckId);
      return await noteService.getNotesInfo(noteIdArr.result);
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

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData, thunkAPI) => {
    try {
      const { expression, meaning, reading } = noteData;
      const selectedDeck = thunkAPI.getState().decks.selectedDeck.deckName;
      const response = await noteService.addNote(
        selectedDeck,
        expression,
        meaning,
        reading
      );
      return {
        noteId: response.result,
        fields: {
          Expression: { value: expression },
          Meaning: { value: meaning },
          Reading: { value: reading },
        },
      };
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

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: { notesReset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload.result;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(addNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export default noteSlice.reducer;
export const { notesReset } = noteSlice.actions;
