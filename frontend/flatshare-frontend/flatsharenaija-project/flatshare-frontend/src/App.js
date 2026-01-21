import React, { useState } from "react";
import CreateListing from "./CreateListing";
import Listings from "./Listings";
import Favorites from "./Favorites";
import Profile from "./Profile";

function App() {
  const [page, setPage] = useState("listings");

  return (
    <div>
      <h1>FlatshareNaija</h1>
      <nav>
        <button onClick={() => setPage("listings")}>Listings</button>
        <button onClick={() => setPage("create")}>Create Listing</button>
        <button onClick={() => setPage("favorites")}>Favorites</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </nav>
      {page === "listings" && <Listings />}
      {page === "create" && <CreateListing />}
      {page === "favorites" && <Favorites />}
      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;
