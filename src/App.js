import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./components/Routing";
import ContactFab from "./components/Contact/ContactFab";
import FloatingCartIcon from "./components/Cart/FloatingCartIcon";
import Footer from "./components/Footer";
import UnderConstructionNotice from "./components/UnderConstructionNotice";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routing />
        </div>
        <UnderConstructionNotice />
        <FloatingCartIcon />
        <ContactFab />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
