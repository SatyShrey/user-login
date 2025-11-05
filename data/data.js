export const listItems = ["Stocks", "F&O", "FDs", "Mutual Funds"];

export const IndianStocksArray = [
  { name: "Reliance Industries Ltd.", symbol: "RELIANCE", price: 1486.9 },
  { name: "HDFC Bank Ltd.", symbol: "HDFCBANK", price: 1003.55 },
  { name: "Bharti Airtel Ltd.", symbol: "BHARTIARTL", price: 2090.2 },
  { name: "Tata Consultancy Services Ltd.", symbol: "TCS", price: 3057.9 },
  { name: "ICICI Bank Ltd.", symbol: "ICICIBANK", price: 1363.1 },
  { name: "State Bank of India", symbol: "SBIN", price: 930.25 },
  { name: "Bajaj Finance Ltd.", symbol: "BAJFINANCE", price: 1072.75 },
  { name: "Infosys Ltd.", symbol: "INFY", price: 1500.2 },
  { name: "Adani Enterprises Ltd.", symbol: "ADANIENT", price: 2505.7 },
  { name: "Adani Ports & SEZ Ltd.", symbol: "ADANIPORTS", price: 1426.7 },
  { name: "Larsen & Toubro Ltd.", symbol: "LT", price: 3350.4 },
  { name: "Axis Bank Ltd.", symbol: "AXISBANK", price: 1112.6 },
  { name: "Kotak Mahindra Bank Ltd.", symbol: "KOTAKBANK", price: 1685.9 },
  { name: "Hindustan Unilever Ltd.", symbol: "HINDUNILVR", price: 2480.3 },
  { name: "Maruti Suzuki India Ltd.", symbol: "MARUTI", price: 10650.0 },
  { name: "Asian Paints Ltd.", symbol: "ASIANPAINT", price: 3105.25 },
  { name: "UltraTech Cement Ltd.", symbol: "ULTRACEMCO", price: 8900.1 },
  { name: "Titan Company Ltd.", symbol: "TITAN", price: 3450.75 },
  { name: "Nestle India Ltd.", symbol: "NESTLEIND", price: 2450.6 },
  {
    name: "Sun Pharmaceutical Industries Ltd.",
    symbol: "SUNPHARMA",
    price: 1220.45,
  },
  { name: "Tech Mahindra Ltd.", symbol: "TECHM", price: 1275.8 },
  {
    name: "Power Grid Corporation of India Ltd.",
    symbol: "POWERGRID",
    price: 265.9,
  },
  { name: "NTPC Ltd.", symbol: "NTPC", price: 265.25 },
  { name: "Oil & Natural Gas Corporation Ltd.", symbol: "ONGC", price: 185.6 },
  { name: "Wipro Ltd.", symbol: "WIPRO", price: 420.15 },
  { name: "HCL Technologies Ltd.", symbol: "HCLTECH", price: 1345.9 },
  { name: "Dr. Reddy's Laboratories Ltd.", symbol: "DRREDDY", price: 5450.3 },
  { name: "Cipla Ltd.", symbol: "CIPLA", price: 1280.75 },
  { name: "Bajaj Auto Ltd.", symbol: "BAJAJ-AUTO", price: 5200.4 },
  { name: "Mahindra & Mahindra Ltd.", symbol: "M&M", price: 1725.6 },
];

//get new arrray with different stock prices
export const changeArrayWithRandomValue = (array) => {
  return array.map((item) => {
    const random = parseInt(Math.random() * 1000);
    const even = random % 2 == 0;
    const price = item.price;
    const newPrice = even ? price + price / 100 : price - price / 100;
    const status = even ? "up" : "down";
    const newItem = { ...item, price: parseInt(newPrice), status };
    return newItem;
  });
};
