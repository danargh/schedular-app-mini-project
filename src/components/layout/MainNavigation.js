import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../../assets/logo.png";
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
      <header className="flex items-center justify-between">
         <nav className="px-4 py-2 flex items-center">
            <button className="mx-2 cursor-pointer" onClick={handleSidebar}>
               <MenuIcon />
            </button>
            {/* <Image src={logo} alt="calendar" className="mr-2 w-12 h-12" /> */}
            <h1 className="mr-10 text-xl text-gray-500 fond-bold">SchedularApp</h1>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
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
               <DarkModeIcon fontSize="large" />
            </a>

            <button className="border rounded py-2 px-4 mr-5">Month</button>

            {/* <LightModeIcon fontSize="large" /> */}

            <ProfileButton />
         </div>
      </header>
   );
};

export default MainNavigation;
