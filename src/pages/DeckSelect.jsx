import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDeckNamesAndIds } from "../features/decks/deckSlice";
import Spinner from "../components/Spinner";

function DeckSelect() {
  const dispatch = useDispatch();

  //read decks & loading status from state
  const { decks, isLoading, isError, message } = useSelector(
    (state) => state.decks
  );

  //when a deck is selected
  const onDeckSelected = (e) => console.log("Selected ", e.target.value);

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
    <section>
      <h2>Select a deck</h2>
      <form>
        <select id="decks" onChange={onDeckSelected}>
          {dropDownDeckOptions}
        </select>
      </form>
    </section>
  );
}

export default DeckSelect;
