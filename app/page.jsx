"use client";

import { listItems } from "@/data/data";
import Header from "./Header";
import { useState } from "react";
import Logout from "./Logout";
import { AnimatePresence, motion } from "framer-motion";
import SideNav from "./SideNav";
import Portfolio from "./Portfolio";
import { useValues } from "@/contexts/contexts";
import Loading from "./Loading";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Markets from "./Markets";
import Watchlist from "./Watchlist";

export default function page() {
  const { user, indianStocksArray,watchListItems } = useValues();
  const [viewmenu, setviewmenu] = useState(false);
  const [viewLogout, setviewLogout] = useState(false);
  const [currentTab, setcurrentTab] = useState("Portfolio");

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Header
        listItems={listItems}
        onLogoutClick={() => setviewLogout(true)}
        onMenuClick={() => setviewmenu(true)}
      />
      <motion.div className="mx-3 mb-5 sm:text-xl">
        <span className="">Welcome,</span> &nbsp;
        <span className="font-bold">{user.email}</span>
      </motion.div>
      <Tabs currentTab={currentTab} setcurrentTab={setcurrentTab} />
      {currentTab === "Portfolio" && <Portfolio />}
      {currentTab === "Watchlist" && <Watchlist />}
      {currentTab === "Markets" && <Markets />}
      <Footer />
      <AnimatePresence>
        {viewmenu && (
          <SideNav
            onCloseClick={() => setviewmenu(false)}
            onLogoutClick={() => setviewLogout(true)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {viewLogout && <Logout onClickCancel={() => setviewLogout(false)} />}
      </AnimatePresence>
    </div>
  );
}
