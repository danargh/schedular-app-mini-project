import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";

export default function SearchResultList(props) {
   const { savedEvents, monthIndex, setMonthIndex } = useContext(GlobalContext);

   // search feature
   const results = savedEvents.filter((event) => {
      return event.title.toLowerCase().includes(props.searchKeyword.toLowerCase());
   });

   const handleResult = (event) => {
      const eventDate = new Date(event.day);
      const month = eventDate.getMonth();
      setMonthIndex(month);
   };

   return (
      <>
         <div className="absolute mt-3 ml-3 bg-white w-80 rounded-lg shadow-md">
            <ul className="px-3 py-3 flex flex-col gap-2">
               <p className="text-gray-400 mb-2">Search Results</p>
               {results.map((event, idx) => (
                  <li
                     key={idx}
                     onClick={() => {
                        handleResult(event);
                        props.setKeyword("");
                     }}
                     className={`flex justify-between bg-${event.label}-200 p-1 px-2 mr-3 ml-3 text-gray-600 text-sm rounded mb-1 truncate cursor-pointer`}
                  >
                     <span className="font-semibold">{event.title}</span>
                     <span>{event.times}</span>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}
