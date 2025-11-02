import { Facebook, Instagram, Linkedin, Send, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-4">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2">ABCD Tech Park, 2nd Floor</p>
            <p className="text-sm mb-2">Netaji road, Hyderabad</p>
            <p className="text-sm mb-2">Hyderabad -500018</p>
            <p className="text-sm mb-2">
              <a href="#" className="text-blue-500 hover:underline">
                Contact Us
              </a>
            </p>
            <div className="flex space-x-4">
              <Facebook
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
              <Twitter
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
              <Youtube
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
              <Instagram
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
              <Linkedin
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
              <Send
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                size={20}
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white">Products</h3>
            <ul className="space-y-2">
              {["Stocks", "Futures & Options", "IPO", "Mutual Fund"].map(
                (item) => (
                  <li
                    key={item}
                    className="text-sm hover:text-blue-500 cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">AssetsWallet</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Pricing",
                "Blog",
                "Carrer",
                "Help ans Support",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm hover:text-blue-500 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Amc Mutual Funds",
                "Calculator",
                "Glossary",
                "AssetsWallet Digest",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm hover:text-blue-500 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
        <div className="mt-8 border-gray-200 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500 mb-4">
            {" "}&copy;2014-2025 AssetsWallet. All rights reserved, Built with ❤️ in
            India
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer