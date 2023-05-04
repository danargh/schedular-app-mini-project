import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import GlobalContext from "../../context/GlobalContext";

export default function ProfileButton() {
   const { showProfileModal, setShowProfileModal } = useContext(GlobalContext);

   const handleShowProfileModal = () => {
      setShowProfileModal(!showProfileModal);
   };

   return (
      <>
         <button onClick={handleShowProfileModal}>
            <img
               className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
               width={40}
               height={40}
               src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt="profileImage"
            />
         </button>
      </>
   );
}
