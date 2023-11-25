import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

export default function Labels() {
   const { labels, updateLabel } = useContext(GlobalContext);
   return (
      <React.Fragment>
         <p className="text-gray-500 font-bold mt-10 dark:text-green-300">Label</p>
         {labels.map(({ label: lbl, checked }, idx) => (
            <label key={idx} className="flex items-center mt-3">
               <input type="checkbox" checked={checked} onChange={() => updateLabel({ label: lbl, checked: !checked })} className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`} />
               <span className="ml-2 text-gray-700 capitalize dark:text-slate-100">{lbl}</span>
            </label>
         ))}
      </React.Fragment>
   );
}
