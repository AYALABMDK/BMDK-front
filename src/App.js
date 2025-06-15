import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing";
import ContactFab from "./components/Contact/ContactFab";
import FloatingCartIcon from "./components/FloatingCartIcon";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routing />
        <FloatingCartIcon />
        <ContactFab />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
