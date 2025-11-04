import { motion } from "framer-motion";

function Loading() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-[2px]"
    >
      <div className="p-4 bg-white shadow-[0_0_3px] shadow-black min-w-60 flex gap-2 justify-center items-center text-gray-800">
        <div className="loading"></div>
        <div className="font-semibold">Loading...</div>
      </div>
    </motion.div>
  );
}

export default Loading;
