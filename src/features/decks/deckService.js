import axios from "axios";

// Get all deck names and IDs for current Anki user
const getDeckNamesAndIds = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const postData = { action: "deckNamesAndIds", version: 6 };
  const response = await axios.post("http://localhost:8765", postData, config);
  return response.data;
};

const deckService = { getDeckNamesAndIds };

export default deckService;
