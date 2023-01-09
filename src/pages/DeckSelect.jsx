import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks, deckSelected } from "../features/decks/deckSlice";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";

function DeckSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //read decks & loading status from redux state
  const { selectedDeck, decks, isLoading, isError, message } = useSelector(
    (state) => state.decks
  );

  //when a deck is selected
  const onDeckSelected = (e) => {
    const deckData = decks.find((deck) => deck.deckId === e.target.value);
    dispatch(deckSelected(deckData));
  };

  //when view cards button is pressed
  const onViewCards = () => {
    dispatch(getNotes(selectedDeck.deckId));
    navigate("/notes");
  };

  //load decks on component render
  useEffect(() => {
    if (isError) {
      console.log("error in DeckSelect", message);
    }
    dispatch(getDecks());
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
          <option disabled={selectedDeck}>~~~Select A Deck~~~</option>
          {dropDownDeckOptions}
        </select>
        <br />
        {selectedDeck ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onViewCards}
          >
            View Cards
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default DeckSelect;
