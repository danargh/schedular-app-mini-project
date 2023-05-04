import React, { useContext } from "react";
import plusImg from "../../assets/plus.svg";
import GlobalContext from "../../context/GlobalContext";
import Image from "next/image";

export default function CreateEventButton() {
   const { setShowEventModal, showSidebar } = useContext(GlobalContext);
   return (
      <button
         onClick={() => setShowEventModal(true)}
         className={`border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl ${
            showSidebar === false ? "absolute top-20 left-4" : null
         }`}
      >
         <Image src={plusImg} alt="create_event" className="w-7 h-7" />
         {showSidebar && <span className="ml-2 text-gray-700">Create Event</span>}
      </button>
   );
}
