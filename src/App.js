import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import DeckSelect from "./pages/DeckSelect";
import CardView from "./pages/CardView";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<DeckSelect />} />
            <Route path="/notes" element={<CardView />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
