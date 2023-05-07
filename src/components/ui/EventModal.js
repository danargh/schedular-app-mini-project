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
         <form className="bg-white rounded-lg shadow-2xl w-1/4">
            <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
               <span className="material-icons-outlined text-gray-400">
                  <DragHandleIcon />
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
                        className="material-icons-outlined text-gray-400 cursor-pointer"
                     >
                        <DeleteIcon />
                     </span>
                  )}
                  <button onClick={() => setShowEventModal(false)}>
                     <span className="material-icons-outlined text-gray-400">
                        <CloseIcon />
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
                     className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="flex my-5 items-center">
                     <span className="material-icons-outlined text-gray-400 mr-3">
                        <CalendarMonthIcon />
                     </span>
                     <p>{daySelected.format("dddd, MMMM DD")}</p>
                  </div>

                  <div className="flex my-1 items-center">
                     <span className="material-icons-outlined text-gray-400 mr-3">
                        <AccessTimeIcon />
                     </span>
                     <select name="times" value={times} onChange={(e) => setTimes(e.target.value)}>
                        {getTimesEveryFifteenMinutes().map((time, i) => (
                           <option key={i} value={time}>
                              {time}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className="flex my-3 items-center">
                     <span className="text-gray-400 mr-3">
                        <SegmentIcon />
                     </span>
                     <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        required
                        className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>

                  <div className="flex my-3 items-center">
                     <span className="text-gray-400 mr-3">
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
                                 <span className="material-icons-outlined text-white text-sm">
                                    <CheckIcon />
                                 </span>
                              )}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <footer className="flex justify-end border-t p-3 mt-5">
               <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
               >
                  Save
               </button>
            </footer>
         </form>
      </div>
   );
}
