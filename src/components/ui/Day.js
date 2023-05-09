import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Day({ day, rowIdx }) {
   const [dayEvents, setDayEvents] = useState([]);
   const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent, monthIndex } =
      useContext(GlobalContext);

   useEffect(() => {
      const events = filteredEvents.filter(
         (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
      );
      setDayEvents(events);
   }, [filteredEvents, day]);

   function getCurrentDayClass() {
      return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
         ? "bg-green-300 text-black w-8 text-center font-bold rounded-full"
         : "";
   }

   return (
      <div
         className="border border-gray-200 flex flex-col cursor-pointer dark:border-slate-500"
         onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
         }}
      >
         <header
            className={`flex flex-col items-center dark:bg-slate-700 ${
               monthIndex == day.format("MM").charAt(1) - 1 ? "bg-slate-50" : null
            }`}
         >
            {rowIdx === 0 && (
               <p className="text-sm mt-1 font-bold">{day.format("ddd").toUpperCase()}</p>
            )}
            <p className={`text-m font-normal p-1 my-1 text-center  ${getCurrentDayClass()}`}>
               {day.format("DD")}
            </p>
         </header>
         <div
            className={`flex-1 cursor-pointer dark:bg-slate-700 ${
               monthIndex == day.format("MM").charAt(1) - 1 ? "bg-slate-50" : null
            }`}
         >
            {dayEvents.map((evt, idx) => (
               <div
                  key={idx}
                  onClick={() => setSelectedEvent(evt)}
                  className={`flex justify-between bg-${evt.label}-200 p-1 px-2 mr-3 ml-3 text-gray-600 text-sm rounded mb-1 truncate hover:shadow-md transition-all dark:text-slate-800`}
               >
                  <span className="font-semibold">{evt.title}</span>
                  <span>{evt.times}</span>
               </div>
            ))}
         </div>
      </div>
   );
}
