import Loading from "@/app/Loading";
import { useValues } from "@/contexts/contexts";
import { saveData } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BuySell({ stock }) {
  const [quantity, setquantity] = useState(0);
  const [loading, setloading] = useState(false);
  const { user, portfolioItems, setportfolioItems, indianStocksArray } =
    useValues();
  const [isPortfolioItem, setisPortfolioItem] = useState(null);
  const [inputError, setinputError] = useState("");

  const handleBuy = async () => {
    if (!quantity || quantity == 0 || quantity < 0) {
      return toast.error("Please enter quantity");
    }
    const find = portfolioItems.find((item) => item.symbol === stock.symbol);
    const totalShare = find ? find.quantity : 0;
    const newTotalShare = parseInt(quantity) + totalShare;
    const oldPrice = find ? find.price : 0;
    const livePrice = indianStocksArray.find(
      (a) => a.symbol == stock.symbol
    ).price;
    const averagePrice = (oldPrice + livePrice) / newTotalShare;
    const newPortFolioArray = portfolioItems.filter(
      (item) => item.symbol !== stock.symbol
    );
    const newDoc = { ...stock, quantity: newTotalShare, price: averagePrice };
    try {
      setloading(true);
      await saveData(user.uid, "portfolio", {
        portfolio: [...newPortFolioArray, newDoc],
      });
      setportfolioItems([...newPortFolioArray, newDoc]);
      toast.success(
        `${quantity} share of ${stock.symbol} added to your portfolio`
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const handleSell = async () => {
    if (!quantity || quantity == 0 || quantity < 0) {
      return toast.error("Please enter quantity");
    }
    if (!isPortfolioItem || isPortfolioItem.quantity < quantity) {
      return toast.error(
        `You have not ${quantity} share${quantity > 1 && "s"} of ${
          stock.symbol
        } to sell`
      );
    }
    try {
      setloading(true);
      const newQuantity = isPortfolioItem.quantity - quantity;
      const newDoc = { ...isPortfolioItem, quantity: newQuantity };
      const removeItemAndMakeNew = portfolioItems.filter(
        (f) => f.symbol !== isPortfolioItem.symbol
      );
      const newPortfolioArray =
        newQuantity == 0
          ? removeItemAndMakeNew
          : [...removeItemAndMakeNew, newDoc];
      await saveData(user.uid, "portfolio", { portfolio: newPortfolioArray });
      setportfolioItems(newPortfolioArray);
      toast.success(
        `${quantity} ${quantity > 1 ? "shares": "share"} of ${stock.symbol} sold`
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const isAvailable = portfolioItems.find(
      (item) => item.symbol === stock.symbol
    );
    setisPortfolioItem(isAvailable);
  }, [portfolioItems]);

  return (
    <div className="bg-primary flex justify-center items-center flex-col">
      <div>
        You have{" "}
        <span className="font-bold">
          {isPortfolioItem ? isPortfolioItem.quantity : 0}
        </span>{" "}
        share
        {isPortfolioItem && isPortfolioItem.quantity > 1 && "s"} of{" "}
        <span className="font-bold">{stock.symbol}</span>.
      </div>
      <div className="mx-auto my-2 w-fit">
        <input
          type="number"
          placeholder="Enter Quantity"
          className="h-10 rounded px-3 bg-base-100"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setquantity(value);
            if (!value || value == 0 || value < 0) {
              setinputError("Please enter a valid amount");
            } else setinputError("");
          }}
        />
        <p className="text-error">{inputError}</p>
      </div>
      <div className="flex justify-center gap-3 my-2 w-full">
        <button className="sm:w-1/3 btn btn-success" onClick={handleBuy}>
          Buy
        </button>

        <button className="sm:w-1/3 btn btn-error" onClick={handleSell}>
          Sell
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default BuySell;
