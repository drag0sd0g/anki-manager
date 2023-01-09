import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/noteSlice";

function AddCardForm() {
  const [expression, setExpression] = useState("");
  const [meaning, setMeaning] = useState("");
  const [reading, setReading] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ expression, meaning, reading }));
    setExpression("");
    setMeaning("");
    setReading("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Expression</label>
          <input
            type="text"
            name="expression"
            id="expression"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <label htmlFor="text">Meaning</label>
          <input
            type="text"
            name="meaning"
            id="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
          <label htmlFor="text">Reading</label>
          <input
            type="text"
            name="reading"
            id="reading"
            value={reading}
            onChange={(e) => setReading(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Card
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCardForm;
