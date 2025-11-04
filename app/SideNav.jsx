import { Bell, ShoppingCart, User, X } from "lucide-react";
import { motion } from "framer-motion";
import { listItems } from "@/data/data";
import Link from "next/link";

function SideNav({ onCloseClick }) {
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
        </button>{" "}
        <div className="flex justify-evenly mt-4 border-b pb-1 mx-1">
          <button className=" relative cursor-pointer hover:scale-110 hover:text-gray-300 duration-300">
            <Bell size={27} />
            <span className="absolute top-0 right-0 flex justify-center text-xs items-center bg-red-500 h-4 w-4 rounded-full">
              2
            </span>
          </button>
          <button className=" cursor-pointer hover:scale-110 hover:text-gray-300 duration-300">
            <ShoppingCart size={27} />
          </button>
          <button className=" cursor-pointer hover:scale-110 hover:text-gray-300 duration-300">
            <Link href={"/profile"}>
              <User size={27} />
            </Link>
          </button>
        </div>
        <ul className="flex-1 px-3 overflow-y-scroll bar-0">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="my-4 hover:text-gray-300 cursor-pointer duration-300 active:scale-95 hover:ms-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default SideNav;
