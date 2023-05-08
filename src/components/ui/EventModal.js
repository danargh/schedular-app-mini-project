import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getTimesEveryFifteenMinutes } from "../../utils/times";

// icons
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SegmentIcon from "@mui/icons-material/Segment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
   const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, authenticatedUser } =
      useContext(GlobalContext);

   const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
   const [times, setTimes] = useState(selectedEvent ? selectedEvent.times : "");
   const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
   const [selectedLabel, setSelectedLabel] = useState(
      selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
   );

   console.log(selectedEvent);

   function handleSubmit(e) {
      e.preventDefault();
      const [day, month, year] = dayjs(daySelected).format("DD-MMMM-YY").split("-");
      const [hour, minute] = times.split(":");

      const calendarEvent = {
         title,
         description,
         label: selectedLabel,
         times: times,
         date: Timestamp.fromDate(new Date(`${year}-${month}-${day} ${hour}:${minute}:00`)),
         day: daySelected.valueOf(),
         id: selectedEvent ? selectedEvent.id : Date.now(),
         uid: selectedEvent ? selectedEvent.uid : null,
         userRef: authenticatedUser.uid,
      };
      if (selectedEvent) {
         dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
         dispatchCalEvent({ type: "push", payload: calendarEvent });
      }

      setShowEventModal(false);
   }

   return (
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
         <form className="bg-white rounded-lg shadow-2xl w-1/4 dark:bg-slate-600">
            <header className="bg-green-300 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
               <span className=" text-gray-400">
                  <DragHandleIcon sx={{ color: "black" }} />
               </span>
               <div>
                  {selectedEvent && (
                     <span
                        onClick={() => {
                           dispatchCalEvent({
                              type: "delete",
                              payload: selectedEvent,
                           });
                           setShowEventModal(false);
                        }}
                        className=" text-gray-400 cursor-pointer px-3"
                     >
                        <DeleteIcon fontSize="medium" className=" text-red-500" />
                     </span>
                  )}
                  <button onClick={() => setShowEventModal(false)}>
                     <span className=" text-gray-400">
                        <CloseIcon sx={{ color: "black" }} />
                     </span>
                  </button>
               </div>
            </header>
            <div className="p-3">
               <div className="flex flex-col my-3">
                  <input
                     type="text"
                     name="title"
                     placeholder="Add title"
                     value={title}
                     required
                     className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-yellow-300 dark:bg-slate-600 dark:border-b-green-300 dark:placeholder:text-slate-300"
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="flex my-5 items-center">
                     <span className=" text-gray-400 mr-3 dark:text-green-300">
                        <CalendarMonthIcon />
                     </span>
                     <p>{daySelected.format("dddd, MMMM DD")}</p>
                  </div>

                  <div className="flex my-1 items-center">
                     <span className=" text-gray-400 mr-3 dark:text-green-300">
                        <AccessTimeIcon />
                     </span>
                     <select
                        className="rounded-lg border-2 border-gray-300 dark:border-green-300 dark:bg-slate-600"
                        name="times"
                        value={times}
                        onChange={(e) => setTimes(e.target.value)}
                     >
                        {getTimesEveryFifteenMinutes().map((time, i) => (
                           <option key={i} value={time} className="dark:text-slate-200 font-medium">
                              {time}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className="flex my-3 items-center">
                     <span className="text-gray-400 mr-3 dark:text-green-300">
                        <SegmentIcon />
                     </span>
                     <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        required
                        className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-yellow-300 dark:border-b-green-300 dark:bg-slate-600 dark:placeholder:text-slate-200"
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>

                  <div className="flex my-3 items-center">
                     <span className="text-gray-400 mr-3 dark:text-green-300">
                        <BookmarkBorderIcon />
                     </span>
                     <div className="flex gap-x-2">
                        {labelsClasses.map((lblClass, i) => (
                           <span
                              key={i}
                              onClick={() => setSelectedLabel(lblClass)}
                              className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                           >
                              {selectedLabel === lblClass && (
                                 <span className=" text-white text-sm">
                                    <CheckIcon />
                                 </span>
                              )}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <footer className="flex justify-end border-t p-3 mt-5 dark:border-t-green-300">
               <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-yellow-200 hover:bg-yellow-300 px-6 py-2 rounded text-black font-bold transition-color dark:bg-green-300"
               >
                  {selectedEvent ? "Update" : "Create"}
               </button>
            </footer>
         </form>
      </div>
   );
}
