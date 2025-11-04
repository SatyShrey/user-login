import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import { useValues } from "@/contexts/contexts";

function Logout() {
  const {setuser, setviewLogout}=useValues();

  const logout = async () => {
    try {
      await signOut(auth);
      setviewLogout(false)
      setuser(null);
    } catch (e) {
      toast.error(e.message);
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
            onClick={()=> setviewLogout(false)}
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
    </motion.div>
  );
}

export default Logout;
