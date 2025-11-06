import { motion } from "framer-motion";

function Loading() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-[2px]"
    >
      <div className="p-4 bg-base-100 flex flex-col items-center shadow-[0_0_10px_black]">
        <span className="loading loading-bars"/>
        <div className="font-semibold">Please wait...</div>
      </div>
    </motion.div>
  );
}

export default Loading;
