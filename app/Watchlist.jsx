import { motion } from "framer-motion";
import { useValues } from "@/contexts/contexts";
import Link from "next/link";

const StockPriceCard = ({ stock }) => {
  const { indianStocksArray } = useValues();
    const find=indianStocksArray.find(a=>a.symbol === stock.symbol);
  return (
    <Link href={`/stock-data/${find.symbol}`} className="hover:bg-black active:scale-95 bg-gray-950 shadow-md rounded p-2 overflow-hidden text-center cursor-pointer duration-300 items-center grid grid-cols-2">
      <h2><div className="md:text-lg font-bold">{find.symbol}</div> <div>{find.name}</div> </h2>
      <p
        className={`${
          find.status === "up" ? "text-green-600" : "text-red-600"
        } md:text-xl my-2`}
      >
        ₹{find.price} {find.status === "up" ? <>&uarr;</> : <>&darr;</>}
      </p>
    </Link>
  );
};

const Watchlist = () => {
  const { watchListItems } = useValues();
  return (
    <div className="p-2 bg-primary min-h-72">
     {
        (watchListItems && watchListItems[0])  ?  '' : <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }} className="w-fit sm:text-xl border-b my-2 px-5">
            Your watchlist is empty
      </motion.div>
     }
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
      >
        {watchListItems &&
          watchListItems.map((stock) => (
            <StockPriceCard key={stock.symbol} stock={stock} />
          ))}
      </motion.div>
    </div>
  );
};

export default Watchlist;