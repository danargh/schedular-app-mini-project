import { firebaseAuth } from "../lib/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "../components/ui/Spinner";
import { getSignInErrorMessage, signIn } from "../lib/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

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
         <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
               <div className=" w-11/12 max-w-[700px] px-10 py-8 rounded-xl bg-white border-2 border-gray-100">
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
                           className={`w-full border-2 border-gray-300 rounded-xl p-3 mt-1 text-gray-500 ${
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
                           className={`w-full border-2 border-gray-300 rounded-xl p-3 mt-1 text-gray-500 ${
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
                           className="active:scale-[.98] active:duration-75 transition-all hover:bg-yellow-300  ease-in-out transform py-3 bg-yellow-200 rounded-xl text-black font-bold text-lg"
                        >
                           {isLoading ? <span>Loading...</span> : "Sign In"}
                        </button>
                     </div>
                  </form>
                  <div className="mt-8 flex justify-center items-center">
                     <p className="font-medium text-base">Don&apos;t have an account?</p>
                     <button
                        onClick={() => router.push("/register")}
                        className="ml-2 font-medium text-base text-yellow-300"
                     >
                        Sign up
                     </button>
                  </div>
               </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
               <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-yellow-200 to-red-200 animate-spin" />
               <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
         </div>
      </>
   );
}
