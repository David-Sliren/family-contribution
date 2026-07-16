"use client";
import { useNotification } from "@/store/ui/notifications";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { LuBellRing } from "react-icons/lu";

export const Notification = ({ className }) => {
  const notification = useNotification((state) => state.notification);
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{
            x: "110%",
            opacity: 0,
            y: "-110%",
          }}
          animate={{
            x: 0,
            opacity: 1,
            y: 0,
          }}
          transition={{
            ease: "easeOut",
            delay: 0.4,
          }}
          exit={{
            x: "110%",
            opacity: 0,
            y: "-110%",
          }}
          className={clsx(
            "bg-gradient-to-tr from-transparent to-zinc-600/28 fixed md:right-2 top-2 right-4 flex justify-evenly items-center h-18 max-w-96 min-w-80 p-8 border  rounded-2xl text-white/90 font-semibold z-9999 overflow-hidden gap-x-2.5 pointer-events-none",
            {
              "bg-red-500/58 border-red-700/45": notification?.type == "error",
              "bg-green-500/65 border-green-700/45":
                notification?.type == "success",
              "bg-amber-500/60 border-amber-700/45":
                notification?.type == "info",
              "bg-primary/58 border-primary/45":
                notification?.type == "default",
            },
          )}
        >
          <LuBellRing className="text-4xl animate-tada animate-delay-800" />
          <span className="truncate text-sm">{notification?.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
