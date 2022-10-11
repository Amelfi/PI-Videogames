
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/homePage/Home";
import LandingPage from "./components/landingPage/LandingPage";
import GameDetails from "./components/gameDetails/GameDetails"
import CreateGame from "./components/CreateGame/CreateGame"
import Nav from "./components/NavsComponent/Nav";
import Footer from "./components/Footer/Footer";
import './app.css'
function App() {
  return (
    <Router>
      <div className="app">
        <Nav/>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/create" element={<CreateGame/>} />
          <Route path="/detail/:id" element={<GameDetails/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
