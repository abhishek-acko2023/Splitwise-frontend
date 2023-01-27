// Routing
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import User from "../User/User";
import Group from "../Group/Group";

// Driver App
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/user" exact element={<User />} />
        <Route path="/group" exact element={<Group />} />
      </Routes>
    </div>
  );
};

export default App;
