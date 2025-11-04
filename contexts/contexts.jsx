"use client";
import Loading from "@/app/Loading";
import Logout from "@/app/Logout";
import { changeArrayWithRandomValue, IndianStocksArray } from "@/data/data";
import { auth, retriveData } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Contexts = createContext(null);
export default function GlobalProvider({ children }) {
  const [user, setuser] = useState(null);
  const [indianStocksArray, setindianStocksArray] = useState(IndianStocksArray);
  const [portfolioItems, setportfolioItems] = useState([]);
  const [watchListItems, setwatchListItems] = useState([]);
  const [theme, settheme] = useState("dark");
  const [viewLogout, setviewLogout] = useState(false);
  const [viewLoder, setviewLoder] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setindianStocksArray((indianStocksArray) =>
        changeArrayWithRandomValue(indianStocksArray)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const retriveName = async (uid) => {
    const res = await retriveData(uid, "username");
    if (!res) {
      return "";
    }
    return res.username;
  };

  const checkLoginStatus = () => {
    try {
      onAuthStateChanged(auth, async (firebaseuser) => {
        if (firebaseuser) {
          const name = await retriveName(firebaseuser.uid);
          if (name) {
            return setuser({ ...firebaseuser, displayName: name });
          }
          return setuser(firebaseuser);
        } else {
          return route.push("/login");
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setPortFolio = async () => {
    try {
      const res = await retriveData(user.uid, "portfolio");
      if (!res) {
        return;
      }
      setportfolioItems(res.portfolio || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const setWatchList = async () => {
    try {
      const res = await retriveData(user.uid, "watchlist");
      if (!res) {
        return setwatchListItems([]);
      }
      setwatchListItems(res.watchlist || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const setTheme = async () => {
    try {
      const res = await retriveData(user.uid, "theme");
      if (res) {
        settheme(res.theme || "dark");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      checkLoginStatus();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setPortFolio();
      setWatchList();
      setTheme();
    } else {
      setwatchListItems([]);
      setportfolioItems([]);
      settheme("dark");
    }
  }, [user]);

  return (
    <Contexts.Provider
      value={{
        user,
        setuser,
        indianStocksArray,
        portfolioItems,
        setportfolioItems,
        watchListItems,
        setwatchListItems,
        theme,
        settheme,
        setviewLogout,
        setviewLoder,
      }}
    >
      <div data-theme={theme}>
        {children}
        <AnimatePresence>{viewLoder && <Loading />}</AnimatePresence>
        <AnimatePresence>{viewLogout && <Logout />}</AnimatePresence>
      </div>

      <ToastContainer />
    </Contexts.Provider>
  );
}
export const useValues = () => useContext(Contexts);
