import { motion } from "framer-motion";
import { useValues } from "@/contexts/contexts";
import Link from "next/link";

const StockPriceCard = ({ stock }) => {
  return (
    <Link href={`/stock-data/${stock.symbol}`} className="hover:bg-black active:scale-95 bg-gray-950 shadow-md rounded p-2 overflow-hidden text-center cursor-pointer duration-300 items-center grid grid-cols-2">
      <h2><div className="md:text-lg font-bold">{stock.symbol}</div> <div>{stock.name}</div> </h2>
      <p
        className={`${
          stock.status === "up" ? "text-green-600" : "text-red-600"
        } md:text-xl my-2`}
      >
        ₹{stock.price} {stock.status === "up" ? <>&uarr;</> : <>&darr;</>}
      </p>
    </Link>
  );
};

const Markets = () => {
  const { indianStocksArray } = useValues();
  return (
    <div className="p-2 bg-primary min-h-72">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }} className="w-fit sm:text-xl border-b my-2 px-5">
        Most Traded Indian Stocks
      </motion.div>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
      >
        {indianStocksArray &&
          indianStocksArray.map((stock) => (
            <StockPriceCard key={stock.symbol} stock={stock} />
          ))}
      </motion.div>
    </div>
  );
};

export default Markets;
