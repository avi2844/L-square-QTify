import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Hero />
      </div>
    </BrowserRouter>
  );
}

export default App;
