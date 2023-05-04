import { createContext } from "react";

const GlobalContext = createContext({
   monthIndex: 0,
   setMonthIndex: (index) => {},

   smallCalendarMonth: 0,
   setSmallCalendarMonth: (index) => {},

   daySelected: null,
   setDaySelected: (day) => {},

   showEventModal: false,
   setShowEventModal: () => {},

   dispatchCalEvent: ({ type, payload }) => {},
   savedEvents: [],
   selectedEvent: null,
   setSelectedEvent: () => {},

   labels: [],
   setLabels: () => {},
   updateLabel: () => {},

   filteredEvents: [],

   showSidebar: true,
   setShowSidebar: () => {},

   showProfileModal: false,
   setShowProfileModal: () => {},
});

export default GlobalContext;
