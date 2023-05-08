import "../styles/globals.css";
import ContextWrapper from "../context/ContextWrapper";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
   return (
      <>
         <ContextWrapper>
            <ThemeProvider attribute="class">
               <Component {...pageProps} />
            </ThemeProvider>
         </ContextWrapper>
      </>
   );
}
