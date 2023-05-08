import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

import AddIcon from "@mui/icons-material/Add";

export default function CreateEventButton() {
   const { setShowEventModal, showSidebar } = useContext(GlobalContext);
   return (
      <button
         onClick={() => setShowEventModal(true)}
         className={`border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl bg-black ${
            showSidebar === false ? "absolute top-20 left-5" : null
         }`}
      >
         <span>
            <AddIcon fontSize="large" sx={{ color: "white" }} />
         </span>
         {showSidebar && <span className="ml-2 mr-2 font-bold text-white">Create Event</span>}
      </button>
   );
}
