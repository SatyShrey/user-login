
import { motion } from "framer-motion";
import {  Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/app/Loading";
import { useValues } from "@/contexts/contexts";
import { listItems } from "@/data/data";
import { saveData } from "@/firebase/firebase";

const Header = () => {
  const { theme, settheme, user } = useValues();
  const [loading, setloading] = useState(false);
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
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={async () => {
          try {
            setloading(true);
            const newTheme = theme == "black" ? "dark" : "black";
            await saveData(user.uid,'theme', { theme: newTheme });
            settheme(newTheme);
          } catch (err) {
            toast.error(err.message);
          } finally {
            setloading(false);
          }
        }}
        className="not-sm:hidden btn"
      >
        {theme === "black" ? <Moon /> : <Sun />}
      </motion.button>
      {loading && <Loading />}
    </header>
  );
};

export default Header;