import dayjs from "dayjs";
import React, { useContext } from "react";
import logoApp from "../../assets/logoApp.png";
import GlobalContext from "../../context/GlobalContext";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileButton from "../ui/ProfileButton";

// icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

const MainNavigation = () => {
   const { monthIndex, setMonthIndex, showSidebar, setShowSidebar } = useContext(GlobalContext);

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
      <header className="flex items-center justify-between bg-gray-100">
         <nav className="px-4 py-2 flex items-center">
            <button className="mx-2 cursor-pointer" onClick={handleSidebar}>
               <MenuIcon />
            </button>
            <Image src={logoApp} alt="calendar" className="mr-8 w-10 h-10 ml-3" />
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 border-black">
               Today
            </button>
            <button onClick={handlePrevMonth}>
               <span className="cursor-pointer text-gray-600 mx-2">
                  <ArrowBackIosIcon />
               </span>
            </button>
            <button onClick={handleNextMonth}>
               <span className="cursor-pointer text-gray-600 mx-2">
                  <ArrowForwardIosIcon />
               </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
               {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
         </nav>

         <div>
            <a href="#">
               <span className="mx-2">
                  <DarkModeIcon fontSize="large" />
               </span>
            </a>
            {/* <LightModeIcon fontSize="large" /> */}

            <ProfileButton />
         </div>
      </header>
   );
};

export default MainNavigation;
