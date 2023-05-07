import { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getUserDocument } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
   firebaseAuth,
   getEventDocument,
   createEventDocument,
   deleteEventDocument,
} from "../lib/firebase";

function savedEventsReducer(state, { type, payload }) {
   switch (type) {
      case "init":
         return [...payload];
      case "push":
         createEventDocument(payload);
         return [...state, payload];
      case "update":
         return state.map((evt) => (evt.id === payload.id ? payload : evt));
      case "delete":
         deleteEventDocument(payload.uid);
         return state.filter((evt) => evt.id !== payload.id);
      default:
         throw new Error();
   }
}

export default function ContextWrapper(props) {
   const [monthIndex, setMonthIndex] = useState(dayjs().month());
   const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
   const [daySelected, setDaySelected] = useState(dayjs());
   const [showEventModal, setShowEventModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [labels, setLabels] = useState([]);
   const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
   const [showSidebar, setShowSidebar] = useState(true);
   const [showProfileModal, setShowProfileModal] = useState(false);
   const [authenticatedUser, setAuthenticatedUser] = useState({});

   const filteredEvents = useMemo(() => {
      return savedEvents.filter((evt) =>
         labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
      );
   }, [savedEvents, labels]);

   useEffect(() => {
      if (authenticatedUser.uid) {
         getEventDocument(authenticatedUser.uid).then((events) => {
            dispatchCalEvent({ type: "init", payload: events });
            console.log("events", events);
         });
      }
   }, [authenticatedUser]);

   // useEffect(() => {
   //    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
   // }, [savedEvents]);

   useEffect(() => {
      setLabels((prevLabels) => {
         return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
            const currentLabel = prevLabels.find((lbl) => lbl.label === label);
            return {
               label,
               checked: currentLabel ? currentLabel.checked : true,
            };
         });
      });
   }, [savedEvents]);

   useEffect(() => {
      if (smallCalendarMonth !== null) {
         setMonthIndex(smallCalendarMonth);
      }
   }, [smallCalendarMonth]);

   useEffect(() => {
      if (!showEventModal) {
         setSelectedEvent(null);
      }
   }, [showEventModal]);

   function updateLabel(label) {
      setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
   }

   return (
      <GlobalContext.Provider
         value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            selectedEvent,
            setSelectedEvent,
            savedEvents,
            setLabels,
            labels,
            updateLabel,
            filteredEvents,
            showSidebar,
            setShowSidebar,
            showProfileModal,
            setShowProfileModal,
            authenticatedUser,
            setAuthenticatedUser,
         }}
      >
         {props.children}
      </GlobalContext.Provider>
   );
}

// const UserContext = createContext();

// export const UserProvider = (props) => {
//    const [userState, setUserState] = useState(InitialUserState);

//    const SetUser = (userCredential) => {
//       setUserState({ ...userCredential });
//    };

//    const ResetUser = () => {
//       setUserState(InitialUserState);
//    };

//    const value = { ...userState, SetUser, ResetUser };
//    return <UserContext.Provider value={value} {...props} />;
// };
