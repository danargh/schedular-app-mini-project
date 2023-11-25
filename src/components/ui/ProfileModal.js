import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { signOutAccount } from "@/lib/firebase";
import { useRouter } from "next/router";

import CloseIcon from "@mui/icons-material/Close";

export default function ProfileModal() {
   const { setShowProfileModal, authenticatedUser } = useContext(GlobalContext);
   const router = useRouter();

   const handleLogout = () => {
      signOutAccount();
      router.push("/login");
   };

   return (
      <>
         <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
            <form className="bg-white rounded-lg shadow-2xl w-1/4  dark:bg-slate-600">
               <header className="bg-green-300 px-4 py-2 flex justify-end items-center rounded-tl-lg rounded-tr-lg">
                  <div>
                     <button onClick={() => setShowProfileModal(false)}>
                        <span className="material-icons-outlined text-black">
                           <CloseIcon />
                        </span>
                     </button>
                  </div>
               </header>

               <div className="p-3">
                  <div className="flex flex-col items-center gap-3 ml-5">
                     <div className="flex flex-col min-w-full">
                        <p className="font-bold">Username</p>
                        <p>{authenticatedUser.username}</p>
                     </div>
                     <div className="flex flex-col min-w-full">
                        <p className="font-bold">Email</p>
                        <p>{authenticatedUser.email}</p>
                     </div>
                  </div>
               </div>
               <footer className="flex justify-end border-t p-3 mt-5 dark:border-t-green-300">
                  <button className=" bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white mx-3" onClick={handleLogout}>
                     Logout
                  </button>
               </footer>
            </form>
         </div>
      </>
   );
}
