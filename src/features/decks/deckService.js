import axios from "axios";

// Get all deck names and IDs for current Anki user
const getDeckNamesAndIds = async () => {
  const postData = {
    action: "deckNamesAndIds",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
  };
  const response = await axios.post(process.env.REACT_APP_ANKI_URL, postData);
  return response.data;
};

//given an array of deck names, get all stats for each
const getDeckStats = async (deckNameArr) => {
  const postData = {
    action: "getDeckStats",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
    params: { decks: deckNameArr },
  };
  const response = await axios.post(process.env.REACT_APP_ANKI_URL, postData);
  return response.data;
};

const deckService = { getDeckNamesAndIds, getDeckStats };

export default deckService;
