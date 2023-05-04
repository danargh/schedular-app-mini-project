import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Link from "next/link";
import { signOutAccount } from "../../lib/firebase";
import { useRouter } from "next/router";

import CloseIcon from "@mui/icons-material/Close";

export default function ProfileModal() {
   const { showProfileModal } = useContext(GlobalContext);
   const router = useRouter();

   const handleLogout = () => {
      signOutAccount();
      router.push("/auth");
   };

   return (
      <>
         <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
               <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <div>
                     <button onClick={() => setShowEventModal(false)}>
                        <span className="material-icons-outlined text-gray-400">
                           <CloseIcon />
                        </span>
                     </button>
                  </div>
               </header>
               <div className="p-3">
                  <div className="grid grid-cols-1/5 items-end gap-y-7">
                     <div></div>
                     <input
                        type="text"
                        name="title"
                        placeholder="Add title"
                        value={title}
                        required
                        className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                     />
                     <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        required
                        className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                     />
                  </div>
               </div>
               <footer className="flex justify-end border-t p-3 mt-5">
                  <button
                     type="submit"
                     className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                  >
                     Save
                  </button>
               </footer>
            </form>
         </div>
      </>
   );
}
