import Loading from "@/app/Loading";
import { useValues } from "@/contexts/contexts";
import { saveData } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BuySell({ stock }) {
  const [quantity, setquantity] = useState(0);
  const { user, portfolioItems, setportfolioItems, indianStocksArray,setviewLoder } =
    useValues();
  const [isPortfolioItem, setisPortfolioItem] = useState(null);
  const [inputError, setinputError] = useState("");

  const handleBuy = async () => {
    if(!quantity || quantity < 0){return toast.error("Please enter the quantity")}
    try{
      setviewLoder(true);
     const currentQuantity= isPortfolioItem ? isPortfolioItem.quantity : 0 ;
     const currentStateOfStock=indianStocksArray.find((a)=>a.symbol==stock.symbol);
     const previousValue=isPortfolioItem ? (isPortfolioItem.price * isPortfolioItem.quantity) : 0 ;
     const addedValue=quantity * currentStateOfStock.price;
     const updatedQuantity=(quantity+currentQuantity)
     const averagePrice=(previousValue+addedValue)/updatedQuantity;
     const updatedItem={...stock,quantity:updatedQuantity,price:averagePrice}
     const array=portfolioItems.filter(a=>a.symbol !== stock.symbol);
     const updatedPortFolioItems=[...array,updatedItem];
     await saveData(user.uid,'portfolio',{portfolio:updatedPortFolioItems}); 
     setportfolioItems(updatedPortFolioItems)
     toast.success(`${quantity} ${stock.symbol} added to your portfolio`);
    }catch(error){toast.error(error.message)}finally{setviewLoder(false)}
  };

  const handleSell = async () => {
 if(!quantity || quantity < 0){return toast.error("Please enter the quantity")}
 if(!isPortfolioItem || isPortfolioItem.quantity < quantity){return toast.error('You have not '+quantity+" "+stock.symbol+" in your portfolio")}
    try{
      setviewLoder(true);
     const currentQuantity= isPortfolioItem.quantity;
     const updatedQuantity=currentQuantity - quantity
     const updatedItem={...isPortfolioItem,quantity:updatedQuantity}
     const array=portfolioItems.filter(a=>a.symbol !== stock.symbol);
     const updatedPortFolioItems=updatedQuantity==0 ? array : [...array,updatedItem];
     await saveData(user.uid,'portfolio',{portfolio:updatedPortFolioItems});
     setportfolioItems(updatedPortFolioItems)
     toast.success(`${quantity} ${stock.symbol} sold`);
    }catch(error){toast.error(error.message)}finally{setviewLoder(false)}
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
            const value = parseFloat(e.target.value);
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
    </div>
  );
}

export default BuySell;
