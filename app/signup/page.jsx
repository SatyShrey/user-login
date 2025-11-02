"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, DollarSign, IndianRupee, Wallet } from "lucide-react";
import { GiGoldBar } from "react-icons/gi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth, } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../Loading";

const Icon = ({ Component, size = 30 }) => {
  return <Component size={size} />;
};

const Header = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-4xl font-semibold text-center my-1 flex items-center gap-2 text-white"
    >
      <div className="rounded-full bg-white p-1 text-gray-900 border-dashed border-2">
        <Wallet size={40} />
      </div>
      <span>AssetsWallet</span>
    </motion.h1>
  );
};

const SideSection = () => {
  const [assetsArray, setassetsArray] = useState([
    { title: "Indian Stocks", icon: IndianRupee },
    { title: "US Stocks", icon: DollarSign },
    { title: "Gold & Silver", icon: GiGoldBar },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const arr = assetsArray;
      const last = arr.pop();
      arr.unshift(last);
      setassetsArray([]);
      setTimeout(() => {
        setassetsArray([...arr]);
      }, 500);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-primary w-full p-5 flex flex-col justify-around">
      <h3 className="sm:text-4xl font-semibold text-center">
        Simple, Free Investing.
      </h3>
      <div className="h-24 mt-2">
        <AnimatePresence>
          {assetsArray[0] && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex flex-col gap-1 items-center"
            >
              <div className=" p-2 rounded-full border-dashed border-primary border-4 bg-white text-amber-400">
                <Icon Component={assetsArray[0].icon} size={40} />
              </div>
              <div>{assetsArray[0].title}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SignupSection = ({ setloading }) => {
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const route = useRouter();

  const signup = async () => {
    if (!email) {
      return toast.error("Enter email");
    }
    if (!password) {
      return toast.error("Enter password");
    }
    if (!confirmpassword) {
      return toast.error("Plese confirm your password");
    }
    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      confirmpassword === password
    ) {
      try {
        setloading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup success");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <div className="w-full bg-gray-200 text-gray-800 text-center p-5">
      <h3 className="font-semibold text-2xl mb-5">New User Registration</h3>

      {/*............email input div...........*/}
      <div className="focus-within:[&>span]:w-60 w-fit mx-auto">
        <input
          type="email"
          className="border-b border-b-gray-400 w-60 outline-0"
          placeholder="Enter email address"
          onChange={(e) => setemail(e.target.value)}
        />
        <span className="w-0 border-t-2 border-t-primary duration-300 mx-auto block" />
        <div className="text-red-500 h-7">
          {email && !emailRegex.test(email) && "Enter a valid email address"}
        </div>
      </div>
      {/*............password input div...........*/}
      <div className="focus-within:[&>span]:w-60 w-fit mx-auto relative">
        <input
          type={inputType}
          className="border-b border-b-gray-400 w-60 outline-0"
          placeholder="Enter Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <span className="w-0 border-t-2 border-t-primary duration-300 mx-auto block" />
        <div className="text-red-500 h-7">
          {password &&
            !passwordRegex.test(password) &&
            "Enter at least six characters"}
        </div>
        {password && (
          <button
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => {
              setInputType((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          >
            {inputType === "text" ? <BsEyeSlash /> : <BsEye />}
          </button>
        )}
      </div>
      {/*............confirm password input div...........*/}
      <div className="focus-within:[&>span]:w-60 w-fit mx-auto relative">
        <input
          type={inputType2}
          className="border-b border-b-gray-400 w-60 outline-0"
          placeholder="Confirm Password"
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
        <span className="w-0 border-t-2 border-t-primary duration-300 mx-auto block" />
        <div className="text-red-500 h-7">
          {confirmpassword &&
            password &&
            passwordRegex.test(password) &&
            !(password === confirmpassword) &&
            "Please enter the same password"}
        </div>
        {confirmpassword && (
          <button
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => {
              setInputType2((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          >
            {inputType2 === "text" ? <BsEyeSlash /> : <BsEye />}
          </button>
        )}
      </div>
      {/*............signup button...........*/}
      <button
        onClick={signup}
        className="btn btn-primary w-60"
      >
        Signup
      </button>
      <div
        onClick={() => route.back()}
        className="text-blue-600 mt-5 cursor-pointer"
      >
        <ArrowLeft size={15} className="inline" />{" "}
        <span className="hover:underline">Back</span>{" "}
      </div>
    </div>
  );
};

function page() {
  const [loading, setloading] = useState(false);
  return (
    <div className="min-h-screen overflow-y-scroll bg-gray-900 flex justify-center flex-col gap-5 items-center bar-0 px-1 sm:px-3">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg flex overflow-hidden not-sm:flex-col-reverse"
      >
        <SideSection />
        <SignupSection setloading={setloading} />
        {loading && <Loading />}
      </motion.div>
    </div>
  );
}

export default page;
