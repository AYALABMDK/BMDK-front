import React from "react";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import BooksPage from "./components/OrderBook";
import Cart from "./components/Cart";
import BookPreview from "./components/BookPreview";
import TopicDetails from "./components/TopicDetails";
import VideoPage from "./components/VideoPage";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing"

function App() {
  return (
    <div className="App">
     {/* <HomePage></HomePage>
      <AboutPage></AboutPage>
      <TopicDetails></TopicDetails>
      <BooksPage></BooksPage>

      <ContactPage></ContactPage>
      <VideoPage></VideoPage>
<BookPreview></BookPreview>
      <Cart></Cart> */}
 <Router>
      <Navbar />
      <Routing />
    </Router>
    </div>
  );
}

export default App;
