import { useSelector } from "react-redux";
import AddCardForm from "../components/AddCardForm";
import { stripTags } from "../helpers/utils";
import Spinner from "../components/Spinner";

function CardView() {
  const { notes, isLoading } = useSelector((state) => state.notes);
  const renderedNotes = notes.map((note, index) => (
    <tr key={note.noteId}>
      <td>{index}</td>
      <td>{stripTags(note.fields.Expression.value)}</td>
      <td>{stripTags(note.fields.Meaning.value)}</td>
      <td>{stripTags(note.fields.Reading.value)}</td>
    </tr>
  ));

  //show spinner if we're still loading the notes
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Expression</th>
            <th scope="col">Meaning</th>
            <th scope="col">Reading</th>
          </tr>
        </thead>
        <tbody>{renderedNotes}</tbody>
      </table>
      <AddCardForm />
    </section>
  );
}

export default CardView;
