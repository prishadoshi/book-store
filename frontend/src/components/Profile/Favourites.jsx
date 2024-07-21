import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-1">Favourites</h1>
      {FavouriteBooks.length === 0 && (
        <div className="flex flex-col items-center text-xl justify-center h-[90%]">
          <h1 className="text-zinc-300 mb-2">Add Your Favourite Books!</h1>
          <img
            className="h-[40px] rounded-md"
            src="https://as1.ftcdn.net/v2/jpg/02/09/95/26/1000_F_209952607_btYtIW59IM07hWH02qrqqjzcu0aEqAnH.jpg"
            alt=""
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
