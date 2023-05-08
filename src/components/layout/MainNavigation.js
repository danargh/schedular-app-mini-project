import dayjs from "dayjs";
import React, { useContext } from "react";
import logoApp from "../../assets/logoApp.png";
import darkLogoApp from "../../assets/darkLogoApp.png";
import GlobalContext from "../../context/GlobalContext";
import Image from "next/image";
import ProfileButton from "../ui/ProfileButton";
import { useState } from "react";
import { useTheme } from "next-themes";

// icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchResultList from "../ui/SearchResultList";

const MainNavigation = () => {
   const { monthIndex, setMonthIndex, showSidebar, setShowSidebar, savedEvents } =
      useContext(GlobalContext);
   const [searchKeyword, setSearchKeyword] = useState("");
   const { systemTheme, theme, setTheme } = useTheme("light");
   // const currentTheme = theme === "system" ? systemTheme : theme;

   function handleSidebar() {
      setShowSidebar(!showSidebar);
   }

   function handlePrevMonth() {
      setMonthIndex(monthIndex - 1);
   }
   function handleNextMonth() {
      setMonthIndex(monthIndex + 1);
   }
   function handleReset() {
      setMonthIndex(monthIndex === dayjs().month() ? monthIndex : dayjs().month());
   }

   return (
      <header className="flex items-center justify-between bg-gray-100 dark:bg-slate-800">
         <nav className="px-4 py-2 flex items-center">
            <button className="mx-2 cursor-pointer dark:text-slate-400" onClick={handleSidebar}>
               <MenuIcon />
            </button>
            <Image src={darkLogoApp} alt="calendar" className="mr-8 w-10 h-10 ml-3" />
            <button
               onClick={handleReset}
               className="border rounded py-2 px-4 mr-5 border-black dark:border-green-300 dark:text-slate-200"
            >
               Today
            </button>
            <button onClick={handlePrevMonth}>
               <span className="cursor-pointer text-gray-600 mx-2 dark:text-green-300">
                  <ArrowBackIosIcon />
               </span>
            </button>
            <button onClick={handleNextMonth}>
               <span className="cursor-pointer text-gray-600 mx-2 dark:text-green-300">
                  <ArrowForwardIosIcon />
               </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold dark:text-slate-400">
               {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
            <p className="ml-5 text-gray-600 font-semibold dark:text-slate-500">
               Total {savedEvents.length} Events
            </p>
         </nav>

         <div className="flex items-center">
            <div className="mr-8">
               <input
                  type="text"
                  placeholder="Search..."
                  value={searchKeyword}
                  className="mx-3 w-80 rounded-lg border-black dark:bg-slate-700 dark:placeholder:text-slate-400"
                  onChange={(e) => setSearchKeyword(e.target.value)}
               />
               <SearchIcon fontSize="large" className="dark:text-green-300" />
               {searchKeyword && (
                  <SearchResultList searchKeyword={searchKeyword} setKeyword={setSearchKeyword} />
               )}
            </div>

            {theme === "light" ? (
               <button
                  className="mx-3"
                  onClick={() => {
                     setTheme("dark");
                  }}
               >
                  <LightModeIcon fontSize="large" />
               </button>
            ) : (
               <button
                  className="mx-3 dark:text-green-300"
                  onClick={() => {
                     setTheme("light");
                  }}
               >
                  <DarkModeIcon fontSize="large" />
               </button>
            )}

            <ProfileButton />
         </div>
      </header>
   );
};

export default MainNavigation;
