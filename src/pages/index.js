import darkLogoApp from "@/assets/darkLogoApp.png";
import Image from "next/image";
import bgLightMode from "@/assets/bgLightMode.png";
import { useRouter } from "next/router";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function LandingPage() {
   const router = useRouter();

   const handleLogin = () => {
      router.push("/login");
   };

   return (
      <>
         <header className="bg-white h-screen w-full text-slate-800">
            <nav className="flex items-center max-w-5xl mx-auto justify-between px-5 py-3 font-semibold ">
               <div>
                  <Image src={darkLogoApp} alt="calendar" className="mr-8 w-10 ml-3" />
               </div>
               <div className="hidden md:flex itemx-center justify-center gap-8">
                  <ul className="cursor-pointer hover:text-green-300">Home</ul>
                  <ul className="cursor-pointer hover:text-green-300">Products</ul>
                  <ul className="cursor-pointer hover:text-green-300">Contact</ul>
                  <ul className="cursor-pointer hover:text-green-300">About</ul>
               </div>
               <div>
                  <button onClick={handleLogin} className="bg-green-300 px-6 py-2 rounded-lg hover:bg-green-400">
                     Login
                  </button>
               </div>
            </nav>
            <section className="flex items-center max-w-5xl mx-auto px-5 justify-between mt-20">
               <div className="hidden lg:flex justify-end items-center absolute right-0 top-28 max-w-xl">
                  <Image src={bgLightMode} alt="calendar" />
               </div>
               <div className="flex flex-col justify-between items-start w-full lg:max-w-2xl">
                  <p className="text-xl font-semibold text-slate-500">SchedularApp</p>
                  <h1 className=" text-5xl w-3/4 my-5 font-bold leading-snug">
                     <span className="text-slate-800 text-5xl lg:text-6xl">Take control your schedule & boost your productivity </span>
                  </h1>
                  <button onClick={handleLogin} className="flex hover:bg-green-400 items-center justify-center bg-green-300 px-8 py-4 rounded-lg font-bold mt-8">
                     <span>Get Started</span>
                     <span className="pl-3">
                        <ArrowOutwardIcon />
                     </span>
                  </button>
               </div>
            </section>
         </header>
      </>
   );
}
