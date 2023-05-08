import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

import AddIcon from "@mui/icons-material/Add";

export default function CreateEventButton() {
   const { setShowEventModal, showSidebar } = useContext(GlobalContext);
   return (
      <button
         onClick={() => setShowEventModal(true)}
         className={`p-2 rounded-full flex items-center bg-black dark:bg-green-300 dark:hover:bg-green-400 dark:border-green-300 ${
            showSidebar === false ? "absolute top-20 left-5" : null
         }`}
      >
         <span>
            <AddIcon fontSize="large" sx={{ color: "white" }} className="dark:text-slate-800 " />
         </span>
         {showSidebar && (
            <span className="ml-2 mr-2 font-bold text-white dark:text-slate-800">Create Event</span>
         )}
      </button>
   );
}
