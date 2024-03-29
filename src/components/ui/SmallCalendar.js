import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { getMonth } from "@/utils/calendar-month";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function SmallCalendar() {
   const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
   const [currentMonth, setCurrentMonth] = useState(getMonth());

   useEffect(() => {
      setCurrentMonth(getMonth(currentMonthIdx));
   }, [currentMonthIdx]);

   const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext);

   useEffect(() => {
      setCurrentMonthIdx(monthIndex);
   }, [monthIndex]);

   function handlePrevMonth() {
      setCurrentMonthIdx(currentMonthIdx - 1);
   }
   function handleNextMonth() {
      setCurrentMonthIdx(currentMonthIdx + 1);
   }
   function getDayClass(day) {
      const format = "DD-MM-YY";
      const nowDay = dayjs().format(format);
      const currDay = day.format(format);
      const slcDay = daySelected && daySelected.format(format);
      if (nowDay === currDay) {
         return "bg-green-300 rounded-full text-black font-bold";
      } else if (currDay === slcDay) {
         return "bg-green-100 rounded-full text-green-500 font-bold";
      } else {
         return "";
      }
   }
   return (
      <div className="mt-9">
         <header className="flex justify-between mb-3 ml-2">
            <p className="text-black font-semibold dark:text-green-300">{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}</p>
            <div>
               <button onClick={handlePrevMonth}>
                  <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 dark:text-green-300">
                     <ArrowBackIosIcon fontSize="small" />
                  </span>
               </button>
               <button onClick={handleNextMonth}>
                  <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 dark:text-green-300">
                     <ArrowForwardIosIcon fontSize="small" />
                  </span>
               </button>
            </div>
         </header>
         <div className="grid grid-cols-7 grid-rows-6">
            {currentMonth[0].map((day, i) => (
               <span key={i} className="text-sm py-1 text-center font-semibold dark:text-slate200">
                  {day.format("dd").charAt(0)}
               </span>
            ))}
            {currentMonth.map((row, i) => (
               <React.Fragment key={i}>
                  {row.map((day, idx) => (
                     <button
                        key={idx}
                        onClick={() => {
                           setSmallCalendarMonth(currentMonthIdx);
                           setDaySelected(day);
                        }}
                        className={`py-1 w-full ${getDayClass(day)}`}
                     >
                        <span className="text-sm">{day.format("D")}</span>
                     </button>
                  ))}
               </React.Fragment>
            ))}
         </div>
      </div>
   );
}
