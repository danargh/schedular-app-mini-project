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
            <PersonIcon fontSize="large" />
         </button>
      </>
   );
}
