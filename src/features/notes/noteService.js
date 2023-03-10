import axios from "axios";

//Get all note IDs from a given deck
const getNotesForDeck = async (deckId) => {
  const postData = {
    action: "findNotes",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: { query: "did:".concat(deckId) },
  };
  const response = await axios.post(process.env.REACT_APP_ANKI_URL, postData);
  return response.data;
};

//Get all note info
const getNotesInfo = async (noteIdArr) => {
  const postData = {
    action: "notesInfo",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: { notes: noteIdArr },
  };
  const response = await axios.post(process.env.REACT_APP_ANKI_URL, postData);
  return response.data;
};

//add a note
const addNote = async (deckName, expression, reading, meaning) => {
  //prep payload
  const postData = {
    action: "addNote",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: {
      note: {
        deckName,
        modelName: "Basic",
        fields: {
          Expression: expression,
          Reading: reading,
          Meaning: meaning,
        },
      },
    },
  };
  // peform async call
  const response = await axios.post(process.env.REACT_APP_ANKI_URL, postData);
  return response.data;
};

const noteService = { getNotesForDeck, getNotesInfo, addNote };

export default noteService;
