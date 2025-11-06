"use client";

import { useValues } from "@/contexts/contexts";
import Loading from "../Loading";
import { Moon, Sun, User } from "lucide-react";
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
      <div className="p-4 w-xl max-w-full mx-auto my-2 bg-primary flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="border-2 rounded-full p-4"
        >
          <User size={50} />
        </motion.div>
        {user.displayName && (
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold"
          >
            {user.displayName}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          {user.email}
        </motion.p>
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
                className="btn w-full mt-5"
                onClick={() => setviewEdit(true)}
              >
                {user.displayName ? "Edit Username" : "Set Username"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
          className="btn w-full mt-2"
          onClick={changeTheme}
        >
          {theme == "dark" ? <Sun /> : <Moon />}
          Change Theme
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="btn btn-error w-full mt-2"
          onClick={() => setviewLogout(true)}
        >
          Logout
        </motion.button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
