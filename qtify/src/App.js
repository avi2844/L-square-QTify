import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Hero />
        <Section />
      </div>
    </BrowserRouter>
  );
}

export default App;
