import Link from "next/link";

const MainNavigation = () => {
   return (
      <header>
         <div>
            <Link href="/sidebar">SideBar</Link>
         </div>
         <nav>
            <ul>
               <li>
                  <Link href="/">Logo</Link>
               </li>
               <li>
                  <Link href="/monthBefore">left Arrow</Link>
               </li>
               <li>
                  <Link href="/monthAfter">right Arrow</Link>
               </li>
               <li>
                  <Link href="/month">Bulan - Tahun</Link>
               </li>
            </ul>
            <ul>
               <li>
                  <Link href="/search">Search</Link>
               </li>
               <li>
                  <Link href="/panduan">Panduan</Link>
               </li>
               <li>
                  <div>Settings</div>
               </li>
               <li>
                  <div>View</div>
               </li>
               <li>
                  <div>User Profile</div>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default MainNavigation;
