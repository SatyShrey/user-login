"use client";
import { useValues } from "@/contexts/contexts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "@/app/Loading";
import { toast } from "react-toastify";
import BuySell from "./BuySell";
import Chart from "./Chart";
import { saveData } from "@/firebase/firebase";

function page() {
  const { id } = useParams();
  const { indianStocksArray, user, setwatchListItems, watchListItems } =
    useValues();
  const [stock, setstock] = useState(null);
  const [loading, setloading] = useState(false);
  const [notfounderror, setnotfounderror] = useState("");

  const handleSetWatchlist = async () => {
    const find = watchListItems.find((item) => item.symbol == id);
    if (find) {
      return toast("This stock is already in your watchlist");
    }
    try {
      setloading(true);
      const newDoc = indianStocksArray.find((item) => item.symbol == id);
      let updatedData = [...watchListItems, newDoc];
      await saveData(user.uid, "watchlist", { watchlist: updatedData });
      setwatchListItems(updatedData);
      toast.success(`${id} added to tour watchlist`);
    } catch (err) {
      toast.error(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const displayStock = indianStocksArray.find((item) => item.symbol === id);
    if (displayStock) {
      setstock(displayStock);
    } else {
      setnotfounderror(
        "Sorry, The selected stock is not available in our platform."
      );
    }
  }, [indianStocksArray]);

  if (!user) {
    return <Loading />;
  }

  if (!stock) {
    return <p className="text-error">{notfounderror}</p>;
  }

  return (
    <div>
      <Header />
      <div className="p-2">
        <h2 className="text-xl font-bold">{id}</h2>
        <div className="flex justify-between">
          <div>
            <p>{stock.name}</p>
            <p>
              price:{" "}
              <span
                className={
                  stock.status === "up" ? "text-success" : "text-error"
                }
              >
                ₹{stock.price}
              </span>
            </p>
          </div>
          <div>
            <button onClick={handleSetWatchlist} className="btn btn-primary">
              Add to Watchlist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 my-2">
          <div>
            <Chart stock={stock} />
          </div>
          <BuySell stock={stock} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default page;
