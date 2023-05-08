import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
   return (
      <aside className="border p-5 w-64 dark:bg-slate-700 dark:border-slate-700">
         <CreateEventButton />
         <SmallCalendar />
         <Labels />
      </aside>
   );
}
