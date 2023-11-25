import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signUp } from "@/lib/firebase";
import { useState } from "react";
import { createUserDocument, firebaseAuth, getSignUpErrorMessage } from "@/lib/firebase";
import Spinner from "@/components/ui/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";

import React from "react";

export default function Register() {
   const [user, loading] = useAuthState(firebaseAuth);
   const [errorMessage, setErrorMesssage] = useState(null);
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const formik = useFormik({
      initialValues: {
         username: "",
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         username: Yup.string().min(3, "Must be 3 characters or more").max(25, "Must be 25 characters or less").required("Required"),
         email: Yup.string().email("Invalid email address").required("Required"),
         password: Yup.string().min(6, "Must be 6 characters or more").max(25, "Must be 25 characters or less").required("Required"),
      }),
      onSubmit: (values) => {
         (async () => {
            try {
               setIsLoading(true);
               const res = await signUp(values.email, values.password);
               await createUserDocument(res.user, values.username);
               router.push("/home");
               setIsLoading(false);
            } catch (error) {
               const errorMessage = getSignUpErrorMessage(error.code);
               setErrorMesssage(errorMessage);
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
            <div className="w-full flex items-center justify-center">
               <div className=" w-11/12 max-w-[600px] px-10 py-8 rounded-3xl bg-white border-2 border-gray-100 dark:text-slate-800">
                  <h1 className="text-5xl font-semibold text-black text-center">Sign Up</h1>
                  {errorMessage && showErrorMessage && (
                     <div className="px-3 flex justify-between bg-red-400 text-center p-1 rounded-lg font-semibold text-white mt-5 relative transition-all">
                        {errorMessage}
                        <button onClick={() => setShowErrorMessage(false)}>
                           <CloseIcon />
                        </button>
                     </div>
                  )}
                  <form className="mt-8" onSubmit={formik.handleSubmit}>
                     <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="username">
                              Username*
                           </label>
                           {formik.touched.username && formik.errors.username ? <div className="text-red-500">{formik.errors.username}</div> : null}
                        </div>
                        <input
                           id="username"
                           name="username"
                           type="text"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.username}
                           className={`w-full border-2 rounded-xl border-gray-100 p-3 mt-1 text-gray-500 ${formik.touched.username && formik.errors.username ? "bg-red-100 border-red-500" : ""}}`}
                           placeholder="Enter your username"
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="email">
                              Email*
                           </label>
                           {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                        </div>
                        <input
                           id="email"
                           name="email"
                           type="email"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                           className={`w-full border-2 border-gray-100 rounded-xl p-3 mt-1 text-gray-500 ${formik.touched.email && formik.errors.email ? "bg-red-100 border-red-500" : null}}`}
                           placeholder="Enter your email"
                        />
                     </div>

                     <div className="flex flex-col mt-4">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="password">
                              Password*
                           </label>
                           {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                        </div>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                           className={`w-full border-2 border-gray-100 rounded-xl p-3 mt-1 text-gray-500 ${formik.touched.password && formik.errors.password ? "bg-red-100 border-red-500" : null}}`}
                           placeholder="Enter your password"
                        />
                     </div>

                     <div className="mt-8 flex flex-col gap-y-4">
                        <button type="submit" className="active:scale-[.98] active:duration-75 transition-all hover:bg-green-400  ease-in-out transform py-3 bg-green-300 rounded-xl text-black font-bold text-lg">
                           {isLoading ? (
                              <span>
                                 <svg aria-hidden="true" role="status" class="inline w-8 h-8 mr-3 text-green-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              "Sign Up"
                           )}
                        </button>
                     </div>
                  </form>
                  <div className="mt-4 flex justify-center items-center">
                     <p className="font-medium text-base text-black">Have an account?</p>
                     <button onClick={() => router.push("/login")} className="ml-2 font-medium text-base text-green-300">
                        Sign in
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
