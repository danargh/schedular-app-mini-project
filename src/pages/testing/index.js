import { collection, getDocs } from "firebase/firestore/lite";
import { fireStoreDB } from "@/lib/firebase";

export default function index() {
   // Get a list of cities from your database
   async function getCities(db) {
      const citiesCol = collection(db, "cities");
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map((doc) => doc.data());
      return cityList;
   }

   return <div>index</div>;
}
