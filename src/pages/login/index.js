import { firebaseAuth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "../../components/ui/Spinner";
import { getSignInErrorMessage, signIn } from "../../lib/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import logoAppText from "../../assets/logoAppText.png";
import Image from "next/image";

export default function Login() {
   const router = useRouter();
   const [user, loading] = useAuthState(firebaseAuth);
   const [errorMessage, setErrorMesssage] = useState(null);
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address").required("Required"),
         password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .max(25, "Must be 25 characters or less")
            .required("Required"),
      }),
      onSubmit: (values) => {
         (async () => {
            try {
               setIsLoading(true);
               await signIn(values.email, values.password);
               router.push("/home");
               setIsLoading(false);
            } catch (error) {
               const errorMessage = getSignInErrorMessage(error.code);
               setErrorMesssage(errorMessage);
               setShowErrorMessage(true);
               setIsLoading(false);
            }
         })();
      },
   });

   if (loading) {
      return <Spinner />;
   }

   if (user) {
      router.push("/home");
   }

   return (
      <>
         <div className="flex w-full h-screen dark:bg-white">
            <div className="w-full flex-col flex items-center justify-center">
               <Image src={logoAppText} alt="calendar" className="mx-8 w-24 mb-8" />
               <div className=" w-11/12 max-w-[600px] px-10 py-6 rounded-xl bg-white border-2 border-gray-100 dark:text-slate-800">
                  <h1 className="text-5xl font-semibold text-center">Sign In</h1>
                  {errorMessage && showErrorMessage && (
                     <div className="px-3 flex justify-between bg-red-400 text-center p-1 rounded-lg font-semibold text-white mt-5 relative transition-all">
                        {errorMessage}
                        <button onClick={() => setShowErrorMessage(false)}>
                           <CloseIcon />
                        </button>
                     </div>
                  )}

                  <form className="mt-3" onSubmit={formik.handleSubmit}>
                     <div className="flex flex-col mt-1">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="email">
                              Email*
                           </label>
                           {formik.touched.email && formik.errors.email ? (
                              <div className="text-red-500">{formik.errors.email}</div>
                           ) : null}
                        </div>
                        <input
                           id="email"
                           name="email"
                           type="email"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                           className={`w-full border-2 border-gray-200 rounded-xl p-3 mt-1 text-gray-500 ${
                              formik.touched.email && formik.errors.email
                                 ? "bg-red-100 border-red-500"
                                 : null
                           }}`}
                           placeholder="Enter your email"
                        />
                     </div>

                     <div className="flex flex-col mt-4">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="password">
                              Password*
                           </label>
                           {formik.touched.password && formik.errors.password ? (
                              <div className="text-red-500">{formik.errors.password}</div>
                           ) : null}
                        </div>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                           className={`w-full border-2 border-gray-200 rounded-xl p-3 mt-1 text-gray-500 ${
                              formik.touched.password && formik.errors.password
                                 ? "bg-red-100 border-red-500"
                                 : null
                           }}`}
                           placeholder="Enter your password"
                        />
                     </div>

                     <div className="mt-8 flex flex-col gap-y-4">
                        <button
                           type="submit"
                           className="active:scale-[.98] active:duration-75 transition-all hover:bg-green-400  ease-in-out transform py-3 bg-green-300 rounded-xl text-black font-bold text-lg"
                        >
                           {isLoading ? (
                              <span>
                                 <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-8 h-8 mr-3 text-green-500 animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                       fill="#E5E7EB"
                                    />
                                    <path
                                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                       fill="currentColor"
                                    />
                                 </svg>
                              </span>
                           ) : (
                              "Sign In"
                           )}
                        </button>
                     </div>
                  </form>
                  <div className="mt-8 flex justify-center items-center">
                     <p className="font-medium text-base">Don&apos;t have an account?</p>
                     <button
                        onClick={() => router.push("/register")}
                        className="ml-2 font-medium text-base text-green-300"
                     >
                        Sign up
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
