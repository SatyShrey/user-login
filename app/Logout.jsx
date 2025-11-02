import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { auth } from "@/firebase/firebase";
import Loading from "./Loading";
import { useValues } from "@/contexts/contexts";

function Logout({ onClickCancel }) {
  const [loading, setloading] = useState(false);
  const {setuser}=useValues();

  const logout = async () => {
    try {
      setloading(true);
      await signOut(auth);
      setuser(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ duration: 0.3 }}
        className="p-4 rounded-lg bg-white shadow-[0_0_3px] shadow-black min-w-60"
      >
        <div className="text-gray-800 font-semibold mb-5">
          Are you sure to logout?
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClickCancel}
            className="w-36 btn text-white bg-gray-500 border-gray-500 hover:bg-gray-500/90"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="w-36 btn text-white btn-error"
          >
            Logout
          </button>
        </div>
      </motion.div>
      {loading && <Loading/>}
    </motion.div>
  );
}

export default Logout;
