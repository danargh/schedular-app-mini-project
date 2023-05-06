import { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getUserDocument } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, getEventDocument, createEventDocument } from "../lib/firebase";

async function createEvent(payload) {
   await createEventDocument(payload);
}

function savedEventsReducer(state, { type, payload }) {
   switch (type) {
      case "push":
         const newState = [...state, payload];
         createEvent(payload);
         return newState;
      case "update":
         return state.map((evt) => (evt.id === payload.id ? payload : evt));
      case "delete":
         return state.filter((evt) => evt.id !== payload.id);
      default:
         throw new Error();
   }
}

function initEvents() {
   let storageEvents;
   if (typeof window !== "undefined") {
      storageEvents = localStorage.getItem("savedEvents");
   }
   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
   return parsedEvents;
}

export default function ContextWrapper(props) {
   const [monthIndex, setMonthIndex] = useState(dayjs().month());
   const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
   const [daySelected, setDaySelected] = useState(dayjs());
   const [showEventModal, setShowEventModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [labels, setLabels] = useState([]);
   const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
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

   // useEffect(() => {
   //    if (authenticatedUser.uid) {
   //       getEventDocument(authenticatedUser.uid).then((events) => {
   //          if (events) {
   //             dispatchCalEvent({ type: "push", payload: events.event });
   //          }
   //       });
   //    }
   // }, [authenticatedUser]);

   useEffect(() => {
      localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
   }, [savedEvents]);

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
