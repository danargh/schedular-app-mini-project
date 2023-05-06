import React from "react";
import Day from "./Day";
import GlobalContext from "../../context/GlobalContext";

export default function Month({ month }) {
   const { savedEvents, selectedEvent, filteredEvents } = React.useContext(GlobalContext);
   // console.log("🚀 ~ file: Month.js:7 ~ Month ~ savedEvents:", savedEvents);

   return (
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
         {month.map((row, i) => (
            <React.Fragment key={i}>
               {row.map((day, idx) => (
                  <Day day={day} key={idx} rowIdx={i} />
               ))}
            </React.Fragment>
         ))}
      </div>
   );
}
