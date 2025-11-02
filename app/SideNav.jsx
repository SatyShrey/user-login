import { LogOut, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { listItems } from "@/data/data";
import Loading from "./Loading";
import { useState } from "react";
import { toast } from "react-toastify";
import { useValues } from "@/contexts/contexts";
import { saveData } from "@/firebase/firebase";

function SideNav({ onCloseClick, onLogoutClick }) {
  const { theme, settheme, user } = useValues();
  const [loading, setloading] = useState(false);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 bottom-0 left-0 right-0 flex sm:hidden"
    >
      <div className="flex-1"></div>
      <div className="w-60 bg-primary shadow-[0_0_10px_black] flex flex-col">
        <button
          onClick={onCloseClick}
          className="hover:text-red-500 active:scale-95 duration-300 cursor-pointer w-fit shadow p-0.5"
        >
          <X />
        </button>
        <ul className="flex-1 px-3">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="my-4 hover:text-gray-300 cursor-pointer duration-300 active:scale-95"
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          className="btn mx-2 mb-2"
          onClick={async () => {
            try {
              setloading(true);
              const newTheme = theme == "black" ? "dark" : "black";
              await saveData(user.uid,"theme",{theme:newTheme});
              settheme(newTheme);
            } catch (err) {
              toast.error(err.message);
            } finally {
              setloading(false);
            }
          }}
        >
          {theme === "black" ? <Moon /> : <Sun />} Change Theme
        </button>
        <button onClick={onLogoutClick} className="btn mx-2 mb-2">
          <LogOut className="rotate-180" />
          Logout
        </button>
      </div>
      {loading && <Loading/>}
    </motion.div>
  );
}

export default SideNav;
