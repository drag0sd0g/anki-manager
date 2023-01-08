import axios from "axios";

// Get all deck names and IDs for current Anki user
const getDeckNamesAndIds = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const postData = {
    action: "deckNamesAndIds",
    version: parseInt(process.env.REACT_APP_ANKI_API_VERSION),
  };
  const response = await axios.post(
    process.env.REACT_APP_ANKI_URL,
    postData,
    config
  );
  return response.data;
};

const deckService = { getDeckNamesAndIds };

export default deckService;
