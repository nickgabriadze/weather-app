"use client";
import { useState } from "react";
import navstyle from "../(styles)/navbar.module.css";
import searchIcon from "public/search-icon.svg";
import Image from "next/image";
import { useAppDispatch } from "../(store)/store";
import { setWeatherLocation } from "../(store)/weatherSlice";

const Navbar = () => {
  const [city, setCity] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={navstyle["wrapper"]}>
        <h1 className={navstyle["weather-txt"]}>Weather⛅</h1>
        
        <div className={navstyle["search-city"]}>
          <div className={navstyle["search"]}>
            <Image
              draggable="false"
              src={searchIcon}
              alt="Search Icon"
              width={30}
              height={30}
            />
            <input
              placeholder="Search for your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <button
            className={navstyle["enter"]}
            onClick={() => {
              dispatch(
                setWeatherLocation({
                  providedCity: ""
                    .concat(city[0].toUpperCase())
                    .concat(city.slice(1).toLowerCase()),
                })
              );
            }}
          >
            Go
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
