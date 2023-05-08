import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signUp } from "../../lib/firebase";
import { useState } from "react";
import { createUserDocument, firebaseAuth, getSignUpErrorMessage } from "../../lib/firebase";
import Spinner from "../../components/ui/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";

import React from "react";

export default function Register() {
   const [user, loading] = useAuthState(firebaseAuth);
   const router = useRouter();
   const formik = useFormik({
      initialValues: {
         username: "",
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         username: Yup.string()
            .min(3, "Must be 3 characters or more")
            .max(25, "Must be 25 characters or less")
            .required("Required"),
         email: Yup.string().email("Invalid email address").required("Required"),
         password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .max(25, "Must be 25 characters or less")
            .required("Required"),
      }),
      onSubmit: (values) => {
         (async () => {
            try {
               const res = await signUp(values.email, values.password);
               await createUserDocument(res.user, values.username);
               router.push("/home");
            } catch (error) {
               const errorMessage = getSignUpErrorMessage(error.code);
               console.log(errorMessage);
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
               <div className=" w-11/12 max-w-[700px] px-10 py-8 rounded-3xl bg-white border-2 border-gray-100">
                  <h1 className="text-5xl font-semibold text-black">Sign Up</h1>
                  <form className="mt-8" onSubmit={formik.handleSubmit}>
                     <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                           <label className="text-lg font-medium" htmlFor="username">
                              Username*
                           </label>
                           {formik.touched.username && formik.errors.username ? (
                              <div className="text-red-500">{formik.errors.username}</div>
                           ) : null}
                        </div>
                        <input
                           id="username"
                           name="username"
                           type="text"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.username}
                           className={`w-full border-2 rounded-xl border-gray-100 p-3 mt-1 text-gray-500 ${
                              formik.touched.username && formik.errors.username
                                 ? "bg-red-100 border-red-500"
                                 : ""
                           }}`}
                           placeholder="Enter your username"
                        />
                     </div>
                     <div className="flex flex-col mt-4">
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
                           className={`w-full border-2 border-gray-100 rounded-xl p-3 mt-1 text-gray-500 ${
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
                           className={`w-full border-2 border-gray-100 rounded-xl p-3 mt-1 text-gray-500 ${
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
                           className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 bg-violet-500 rounded-xl text-white font-bold text-lg"
                        >
                           Register
                        </button>
                     </div>
                  </form>
                  <div className="mt-4 flex justify-center items-center">
                     <p className="font-medium text-base text-black">Have an account?</p>
                     <button
                        onClick={() => router.push("/")}
                        className="ml-2 font-medium text-base text-violet-500"
                     >
                        Sign in
                     </button>
                  </div>
               </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
               <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
               <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
         </div>
      </>
   );
}
