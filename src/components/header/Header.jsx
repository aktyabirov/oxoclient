import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/icon/Logo";
import MessagesIcon from "../../assets/icon/MessagesIcon";
import ProfileIcon from "../../assets/icon/ProfileIcon";
import SearchIcons from "../../assets/icon/SearchIcons";
import LocationIcon from "../../assets/icon/LocationIcon";
import { NotLikeIcon } from "../../assets/icon/NotLikeIcon";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useSearch } from "../../hooks/useSearch";
import { SearchCard } from "../SearchCard";


const Header = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading } = useSearch(debouncedSearchTerm);

  const clearSearchInput = () => {
    setSearchTerm("");
    setShowResults(false); 
  };


  return (
    <div>
      <div className="bg-white">
        <div className="container header_shortcut flex justify-between items-center bg-white  py-5 ">
          <Link to="/" className="header_logo">
            <Logo />
          </Link>
          <div className="header_links flex items-center gap-4">
            <Link to="messages" className="flex gap-2">
              <MessagesIcon />
              <p className="hover:text-red-500">Xabarlar</p>
            </Link>
            <Link to="/favorites" className="flex gap-2">
              <NotLikeIcon />
              <p className="hover:text-red-500">Yoqtirganlar</p>
            </Link>
            <Link to="/userprofile" className="flex gap-2">
              <ProfileIcon />
              <p className="hover:text-red-500">Akkaunt</p>
            </Link>
            <div className="flex gap-2">
              <select className="hover:text-red-500">
                <option>UZ</option>
                <option>EN</option>
              </select>
            </div>
            <div>
              <Link
                to="/createproduct"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-500 hover:text-black"
              >
                E'lonlarni joylashtirish
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header_search container flex py-8">
      <div className="search_product relative">
          <input
            className="border border-thirdary rounded-tl-md rounded-bl-md py-2 w-[560px] pl-10"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(e.target.value.length > 1);
            }}
            placeholder="Search..."
          />
          <div className="absolute top-2 left-2 ">
            <SearchIcons />
          </div>
          <div className="search-results">
  {showResults && (isLoading ? (
    <div>Loading...</div>
  ) : (
    searchTerm.length > 1 && (
      data?.length > 0 ? (
        data.map((item) => <SearchCard key={item.id} {...item} clearSearch={clearSearchInput} />)
      ) : (
        <div>No results found.</div>
      )
    )
  ))}
</div>

        </div>
        <div className="search_location relative">
          <input
            className="border border-thirdary rounded-tr-md rounded-br-md rounded-r-md py-2 w-[397px] pl-10"
            type="text"
            placeholder="Butun O`zbekiston"
          />
          <div className="absolute top-2 left-2 ">
            <LocationIcon />
          </div>
        </div>
        <div className="search_button">
          <button className="bg-black text-white py-2 px-[75px]  hover:bg-red-500 hover:text-black rounded-md ml-3  ">
            Izlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
