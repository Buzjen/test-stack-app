import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
