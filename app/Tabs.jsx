import { useState } from "react";
import Portfolio from "./Portfolio";
import Watchlist from "./Watchlist";
import Markets from "./Markets";

 const Tabs = () => {
  const[currentTab,setcurrentTab]=useState('Portfolio');
    return (
      <>
      <div className="grid grid-cols-3 gap-1">
        {["Portfolio", "Watchlist", "Markets"].map((item, index) => (
          <button onClick={()=>setcurrentTab(item)}
            key={index}
            className={`${
              currentTab === item ? "bg-primary" : "bg-primary/50 text-base-content/50"
            } rounded-tr-lg rounded-tl-lg py-2 sm:text-xl cursor-pointer duration-300`}
          >
            {item}
          </button>
        ))}
      </div>
       {currentTab === "Portfolio" && <Portfolio />}
      {currentTab === "Watchlist" && <Watchlist />}
      {currentTab === "Markets" && <Markets />}
      </>
    );
  };
  export default Tabs;