"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BottomCTA() {
  const router = useRouter();
  return (

    <motion.div

      initial={{y:100}}
      animate={{y:0}}

      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md">

      <motion.button

      animate={{
        scale:[1,.98,1]
      }}

      transition={{
        repeat:Infinity,
        duration:2
      }}

      whileTap={{scale:.95}}

      className="w-full bg-orange-500 text-white py-4 rounded-xl shadow-2xl font-bold text-lg"
      onClick={() => router.push("/login")}
      >

        Book a Worker

      </motion.button>

    </motion.div>

  );
}