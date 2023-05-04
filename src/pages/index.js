import { firebaseAuth } from "../lib/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
   const [user, setUser] = useState(null);
   const [authState, setAuthState] = useState(null);
   const router = useRouter();

   useEffect(() => {
      const unSubscribeAuth = onAuthStateChanged(firebaseAuth, async (authenticatedUser) => {
         if (authenticatedUser) {
            setUser(authenticatedUser.email);
            setAuthState("home");
            router.push({
               pathname: "/home",
            });
         } else {
            setUser(null);
            router.push({
               pathname: "/auth",
            });
            setAuthState("login");
         }
      });
      return unSubscribeAuth;
   }, [router, user]);
}
