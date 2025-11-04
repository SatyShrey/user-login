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
  const { setuser, user, setviewLogout, settheme, theme } = useValues();
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
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile-pic"
            className="bg-accent rounded-full w-24 h-24"
          />
        ) : (
          <User size={50} />
        )}
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
            >
              <button
                className="btn w-full mt-5"
                onClick={() => setviewEdit(true)}
              >
                {user.displayName ? "Edit name" : "Set username"}
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
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;
