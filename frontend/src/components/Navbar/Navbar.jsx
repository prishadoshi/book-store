import React from "react";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  return (
    <div className="bg-zinc-800 text-white px-8 py-2 flex items-center justify-between">
      <div className="flex items-center ">
        <img
          className="h-10 m-4 rounded-2xl"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/618/782/small/book-silhoutte-illustration-vector.jpg"
          alt="logo"
        />
        <h1 text-2xl font-semibold>
          BookHeaven
        </h1>
      </div>
      <div className="nav-links-bookheaven flex items-center gap-4 ">
        <div className="flex gap-4">
          {links.map((items, i) => (
            <div
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {items.title}{" "}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
            Sign In
          </button>
          <button className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
