import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDeckNamesAndIds } from "../features/decks/deckSlice";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";

function DeckSelect() {
  const [selectedDeck, setSelectedDeck] = useState({
    deckId: "",
  });

  const dispatch = useDispatch();

  //read decks & loading status from redux state
  const { decks, isLoading, isError, message } = useSelector(
    (state) => state.decks
  );

  //when a deck is selected
  const onDeckSelected = (e) => {
    setSelectedDeck((prevState) => ({
      ...prevState,
      deckId: e.target.value,
    }));
  };

  //when view cards button is pressed
  const onViewCards = () => {
    dispatch(getNotes(selectedDeck.deckId));
  };

  //load decks on component render
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getDeckNamesAndIds());
  }, [isError, message, dispatch]);

  //show spinner if we're still loading the decks
  if (isLoading) {
    return <Spinner />;
  }

  //populate drop down with decks
  const dropDownDeckOptions = decks.map((deck) => (
    <option key={deck.deckId} value={deck.deckId}>
      {deck.deckName}
    </option>
  ));

  return (
    <div className="mx-auto deckSelector">
      <h2>Select a deck</h2>
      <form>
        <select className="form-select" id="decks" onChange={onDeckSelected}>
          {dropDownDeckOptions}
        </select>
        <br />
        <button type="button" className="btn btn-primary" onClick={onViewCards}>
          View Cards
        </button>
      </form>
    </div>
  );
}

export default DeckSelect;
