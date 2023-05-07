import { useState, useContext, useEffect } from "react";
import { getMonth } from "../../utils/calendar-month";
import Sidebar from "../../components/ui/Sidebar";
import Month from "../../components/ui/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/ui/EventModal";
import CreateEventButton from "../../components/ui/CreateEventButton";
import Layout from "../../components/layout/Layout";
import ProfileModal from "../../components/ui/ProfileModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { firebaseAuth } from "../../lib/firebase";
import { getUserDocument, getEventDocument } from "../../lib/firebase";

function Home() {
   const [currenMonth, setCurrentMonth] = useState(getMonth());
   const {
      monthIndex,
      showEventModal,
      showSidebar,
      showProfileModal,
      setAuthenticatedUser,
      dispatchCalEvent,
   } = useContext(GlobalContext);
   const [user, loading] = useAuthState(firebaseAuth);
   const router = useRouter();

   useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
   }, [monthIndex]);

   useEffect(() => {
      if (user) {
         getUserDocument(user.uid).then((usr) => {
            setAuthenticatedUser(usr);
         });
      }
   }, [setAuthenticatedUser, user]);

   if (loading) {
      return <div>Loading</div>;
   }

   if (!user) {
      router.push("/");
      return <div>Loading</div>;
   }

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
