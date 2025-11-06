"use client";

import { useValues } from "@/contexts/contexts";
import Loading from "../Loading";
import { Moon, Pen, Sun, User } from "lucide-react";
import Header from "../Header";
import { saveData } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import EditName from "./EditName";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../Footer";

function Profile() {
  const { user, setviewLogout, settheme, theme } = useValues();
  const [viewEdit, setviewEdit] = useState(false);

  if (!user) {
    return <Loading />;
  }

  const changeTheme = async () => {
    const newTheme = theme == "dark" ? "black" : "dark";
    settheme(newTheme);
    try {
      await saveData(user.uid, "theme", { theme: newTheme });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6 }}
        className="p-4 w-xl max-w-full mx-auto my-2 bg-primary flex flex-col items-center"
      >
        <div className="border-2 rounded-full p-4">
          <User size={50} />
        </div>
        {user.displayName && (
          <p className="text-2xl font-semibold">{user.displayName}</p>
        )}
        <p>{user.email}</p>
        <AnimatePresence>
          {viewEdit && (
            <motion.div
              className="w-full overflow-y-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EditName oncloseClick={() => setviewEdit(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!viewEdit && (
            <motion.div
              className="w-full overflow-y-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                className=" btn w-full mt-5"
                onClick={() => setviewEdit(true)}
              ><Pen size={18}/>
                {user.displayName ? "Edit Username" : "Set Username"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="btn w-full mt-2" onClick={changeTheme}>
          {theme == "dark" ? <Sun /> : <Moon />}
          Change Theme
        </button>
        <button
          className="btn btn-error w-full mt-2"
          onClick={() => setviewLogout(true)}
        >
          Logout
        </button>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Profile;
