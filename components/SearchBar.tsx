"use client";
import React, { useState } from "react";
import { SearchManufacturer } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClass }: { otherClass: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClass}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="search icon"
      width={40}
      height={40}
      className="onject-contain"
    />
  </button>
);

const SearchBar = ({setModel, setManufacturer} ) => {
  const [searchModel, setSearchModel] = useState("");
  const [searchmanufacturer, setSearchManufacturer] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchModel === "" && searchmanufacturer === "") {
      alert("please fill the form correctly");
    }

    setModel(searchModel);
    setManufacturer(searchmanufacturer);
  };

 
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchmanufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClass="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model"
          width={25}
          height={25}
          className="absolute ml-4 w-[20px] h-[20px]"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => {
            setSearchModel(e.target.value);
          }}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClass="sm:hidden" />
      </div>
      <SearchButton otherClass="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
