"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, DollarSign, IndianRupee, Wallet } from "lucide-react";
import { GiGoldBar } from "react-icons/gi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useValues } from "@/contexts/contexts";
import Input from "../Input";

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
              <div className=" p-2 rounded-full border-dashed border-emerald-600 border-4 bg-white text-amber-400">
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

const LoginSection = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const route = useRouter();
  const { setviewLoder } = useValues();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async () => {
    if (!email) {
      return toast.error("Enter email");
    }
    if (!password) {
      return toast.error("Enter password");
    }
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setviewLoder(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login success");
        route.replace("/");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setviewLoder(false);
      }
    }
  };

  return (
    <div className="w-full bg-gray-200 text-gray-800 text-center p-5">
      <h3 className="font-semibold text-2xl mb-5">
        Welcome to <span className="font-bold">AssetsWallet</span>
      </h3>
      <Input
        value={email}
        setValue={setemail}
        ref={emailRef}
        regEx={emailRegex}
        nextRef={passwordRef}
        placeholder="Email"
        type="email"
        error="Please enter a valid email"
      />

      <Input
        value={password}
        setValue={setpassword}
        ref={passwordRef}
        regEx={passwordRegex}
        placeholder="Password"
        type="password"
        error="Enter at least six characters"
        onSubmit={login}
      />
      {/*............Login button...........*/}
      <button onClick={login} className="btn btn-primary w-60">
        Login
      </button>
      <div
        onClick={() => route.push("/signup")}
        className="text-blue-600 mt-5 cursor-pointer"
      >
        <span className="hover:underline">New User Registration</span>{" "}
        <ArrowRight size={15} className="inline" />{" "}
      </div>
    </div>
  );
};

function page() {
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
        <LoginSection />
      </motion.div>
    </div>
  );
}

export default page;
