import { useState, useContext, useEffect } from "react";
import { getMonth } from "../../utils/calendar-month";
import Sidebar from "../../components/ui/Sidebar";
import Month from "../../components/ui/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/ui/EventModal";
import CreateEventButton from "@/components/ui/CreateEventButton";
import Layout from "../../components/layout/Layout";
import ProfileModal from "../../components/ui/ProfileModal";

function Home() {
   const [currenMonth, setCurrentMonth] = useState(getMonth());
   const { monthIndex, showEventModal, showSidebar, showProfileModal } = useContext(GlobalContext);

   useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
   }, [monthIndex]);

   return (
      <>
         {showEventModal && <EventModal />}
         {showProfileModal && <ProfileModal />}

         <Layout>
            <div className="h-screen flex flex-col">
               <div className="flex flex-1">
                  {showSidebar === true ? <Sidebar /> : <CreateEventButton />}
                  <Month month={currenMonth} />
               </div>
            </div>
         </Layout>
      </>
   );
}

export default Home;
