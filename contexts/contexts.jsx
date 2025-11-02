"use client";
import { changeArrayWithRandomValue, IndianStocksArray } from "@/data/data";
import { auth, retriveData } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth/web-extension";
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
  const route = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setindianStocksArray((indianStocksArray) =>
        changeArrayWithRandomValue(indianStocksArray)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const checkLoginStatus = () => {
    try {
      onAuthStateChanged(auth, (firebaseuser) => {
        if (firebaseuser) {
          return setuser(firebaseuser);
        }
        return route.push("/login");
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
      }}
    >
      <div data-theme={theme}>{children}</div>
      <ToastContainer />
    </Contexts.Provider>
  );
}
export const useValues = () => useContext(Contexts);
