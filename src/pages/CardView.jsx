import { useSelector } from "react-redux";
import { stripTags } from "../helpers/utils";

function CardView() {
  const { notes } = useSelector((state) => state.notes);
  console.log(notes);
  const renderedNotes = notes.map((note, index) => (
    <tr key={note.noteId}>
      <td>{index}</td>
      <td>{stripTags(note.fields.Expression.value)}</td>
      <td>{stripTags(note.fields.Meaning.value)}</td>
      <td>{stripTags(note.fields.Reading.value)}</td>
    </tr>
  ));

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
    </section>
  );
}

export default CardView;
