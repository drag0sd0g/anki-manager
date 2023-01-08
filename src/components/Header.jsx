import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const goHome = () => {
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
