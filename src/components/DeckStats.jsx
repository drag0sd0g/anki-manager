import { useSelector } from "react-redux";

function DeckStats() {
  const { selectedDeck } = useSelector((state) => state.decks);

  return (
    <section className="form">
      <label htmlFor="text">Total Cards: {selectedDeck.total_in_deck}</label>
      <br />
      <label htmlFor="text">New: {selectedDeck.new_count}</label>
      <br />
      <label htmlFor="text">Learned: {selectedDeck.learn_count}</label>
      <br />
      <label htmlFor="text">To Review: {selectedDeck.review_count}</label>
    </section>
  );
}

export default DeckStats;
