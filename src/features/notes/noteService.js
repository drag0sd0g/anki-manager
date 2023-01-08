import axios from "axios";

//Get all note IDs from a given deck
const getNotesForDeck = async (deckId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const postData = {
    action: "findNotes",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: { query: "did:".concat(deckId) },
  };
  const response = await axios.post(
    process.env.REACT_APP_ANKI_URL,
    postData,
    config
  );
  return response.data;
};

//Get all note info
const getNotesInfo = async (noteIdArr) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const postData = {
    action: "notesInfo",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: { notes: noteIdArr },
  };
  const response = await axios.post(
    process.env.REACT_APP_ANKI_URL,
    postData,
    config
  );
  return response.data;
};

const noteService = { getNotesForDeck, getNotesInfo };

export default noteService;
