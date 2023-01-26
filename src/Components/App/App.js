// Routing
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";

// Driver App
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
