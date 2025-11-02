import { useValues } from "@/contexts/contexts";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Portfolio() {
  const { indianStocksArray, portfolioItems } = useValues();

  const investment = (portfolioItems = []) => {
    let value = 0;
    portfolioItems.map((item) => {
      value = value + item.price * item.quantity;
    });
    return value;
  };

  const currentvalue = (portfolioItems = []) => {
    let value = 0;
    indianStocksArray.map((item) => {
      const find = portfolioItems.find((f) => f.symbol === item.symbol);
      if (find) {
        value = value + item.price * find.quantity;
      }
    });
    return value;
  };

  const roi = (portfolioItems = []) => {
    return currentvalue(portfolioItems) - investment(portfolioItems);
  };

  return (
    <div className="bg-primary p-2 min-h-72">
      <div className="grid grid-cols-3 bg-gray-950 rounded-lg p-2 text-center not-sm:text-sm">
        <div>
          Total Investment <div>₹{investment(portfolioItems).toFixed(2)}</div>{" "}
        </div>
        <div>
          Current Value <div>₹{currentvalue(portfolioItems).toFixed(2)}</div>{" "}
        </div>
        <div>
          Total Returns{" "}
          <div
            className={`${
              roi(portfolioItems) > 0 ? "text-success" : "text-error"
            }`}
          >
            {roi(portfolioItems) < 0 && "-"}₹
            {roi(portfolioItems).toFixed(2).toString().replace("-", "")}
          </div>{" "}
        </div>
      </div>
      {/*............................*/}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-fit sm:text-xl border-b my-2 px-5"
      >
        Assets
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        {portfolioItems &&
          portfolioItems.map((item, index) => (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden"
              key={index}
            >
              <Link
                href={`/stock-data/${item.symbol}`}
                className="grid grid-cols-3 text-center not-sm:text-sm bg-gray-950 p-2 rounded-lg cursor-pointer hover:bg-black duration-300 active:scale-95 items-center"
              >
                <div>
                  {" "}
                  <div className="font-bold">{item.symbol}</div>{" "}
                  <div>{item.name}</div>
                  <div className="text-sm">Quantity: {item.quantity}</div>
                </div>
                <div>
                  Invested <div>₹{(item.price * item.quantity).toFixed(2)}</div>{" "}
                </div>
                <div>
                  ROI{" "}
                  <div
                    className={`${
                      roi([item]) > 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {roi([item]) < 0 && "-"}₹
                    {roi([item]).toFixed(2).toString().replace("-", "")}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
