import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing"
import ContactFab from "./components/ContactFab"; 


function App() {
  return (
    <div className="App">

 <Router>
      <Navbar />
      <Routing />
      <ContactFab />
    </Router>
    </div>
  );
}

export default App;
