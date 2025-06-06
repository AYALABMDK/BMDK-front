import React from "react";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import BooksPage from "./components/BooksPage";
import BookPurchasePage from "./components/BookPurchasePage";
import Cart from "./components/Cart";
import BookPreview from "./components/BookPreview";
import TopicDetails from "./components/TopicDetails";
import VideoPage from "./components/VideoPage";

function App() {
  return (
    <div className="App">
     <HomePage></HomePage>
      <AboutPage></AboutPage>
      <TopicDetails></TopicDetails>
      <BooksPage></BooksPage>
      <BookPurchasePage book={{ title: "רפס א", price: 40, signs: "א-ו" }} />

      <ContactPage></ContactPage>
      <VideoPage></VideoPage>
<BookPreview></BookPreview>
      <Cart></Cart>

    </div>
  );
}

export default App;
