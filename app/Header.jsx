import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { listItems } from "@/data/data";
import SideNav from "./SideNav";
import { useState } from "react";

const Header = () => {
  const [viewNav, setviewNav] = useState(false);
  return (
    <header className="flex px-3 h-14 items-center bg-primary gap-1">
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        className="font-bold text-2xl cursor-pointer"
      >
        AssetsWallet
      </motion.h1>
      <nav className="flex-1">
        <ul className="hidden sm:flex items-center gap-3 md:gap-5 justify-center">
          {listItems.map((item, index) => (
            <motion.li
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileTap={{ scale: 0.9 }}
              key={index}
              className="w-fit flex items-center flex-col hover:[&>span]:w-full md:text-xl transition-colors hover:text-gray-300"
            >
              <button className="cursor-pointer">{item}</button>
              <span className="h-px w-0 bg-gray-300 duration-300"></span>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.button
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:hidden cursor-pointer hover:scale-105 active:scale-95"
        onClick={() => setviewNav(true)}
      >
        <Menu size={27} />
      </motion.button>

      <div className="flex gap-4 not-sm:hidden">
        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
          className=" relative cursor-pointer hover:text-gray-300"
        >
          <Bell size={27} />
          <span className="absolute top-0 right-0 flex justify-center text-xs items-center bg-red-500 h-4 w-4 rounded-full">
            2
          </span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
          className=" cursor-pointer hover:text-gray-300"
        >
          <ShoppingCart size={27} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
          className=" cursor-pointer hover:text-gray-300"
        >
          <Link href={"/profile"}>
            <User size={27} />
          </Link>
        </motion.button>
      </div>
      <AnimatePresence>
        {viewNav && <SideNav onCloseClick={() => setviewNav(false)} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
