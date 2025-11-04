"use client";
import Header from "./Header";
import {  motion } from "framer-motion";
import { useValues } from "@/contexts/contexts";
import Loading from "./Loading";
import Tabs from "./Tabs";
import Footer from "./Footer";

export default function page() {
  const { user } = useValues();

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <motion.div className="mx-3 my-3 sm:text-xl">
        <span className="">Welcome,</span> &nbsp;
        <span className="font-bold">{user.displayName ? user.displayName : user.email}</span>
      </motion.div>
      <Tabs />
      <Footer/>
    </div>
  );
}
