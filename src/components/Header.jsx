import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { decksReset } from "../features/decks/deckSlice";
import { notesReset } from "../features/notes/noteSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(decksReset());
    dispatch(notesReset());
    navigate("/");
  };

  return (
    <header className="header">
      <button className="btn" onClick={goHome}>
        <FaHome />
      </button>
    </header>
  );
}

export default Header;
