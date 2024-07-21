import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="bg-zinc-800 rounded px-4 py-12 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col lg:flex-row justify-center gap-8">
            {" "}
            <img
              src={Data.url}
              alt=""
              className="h-[50vh] lg:h-[70vh] rounded"
            />
            {isLoggedIn === true && role == "user" && (
              <div className="flex flex-row lg:flex-col  ">
                <button
                  className="bg-zinc-800 rounded-full text-3xl p-0 md:p-2 text-red-600 "
                  onClick={handleFavourite}
                >
                  <FaHeart />
                </button>
                <button
                  className="bg-zinc-800 rounded-full text-3xl p-0 md:p-2 text-blue-700"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
            {isLoggedIn === true && role == "admin" && (
              <div className="flex flex-row lg:flex-col  ">
                <button className="bg-zinc-800 rounded-full text-3xl p-0 md:p-2">
                  <FaEdit />
                </button>
                <button className="bg-zinc-800 rounded-full text-3xl p-0 md:p-2 text-red-700">
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-zinc-300 text-4xl font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1 text-lg">{Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ₹ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
