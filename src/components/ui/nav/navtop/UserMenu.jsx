import Image from "next/image";
import React from "react";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { LuChevronDown } from "react-icons/lu";
import { DropDown } from "./DropDown";
import { useUserStore } from "@/components/provaider/AuthProvider";

export const UserMenu = () => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const firstName = user?.name.split(" ")[0];

  function handleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative font-sans text-gray-800 animate-fade-in-up">
      {/* Botón del Navbar (Trigger) */}
      {isOpen && (
        <div className="fixed h-screen inset-0 z-40" onClick={handleDropdown} />
      )}

      <button
        onClick={handleDropdown}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
      >
        <span className="text-md text-primary/60 font-semibold">
          {firstName}
        </span>

        <Image
          alt="User profile avatar"
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
          src={user?.img || "/family-img/Default.png"}
          height={500}
          width={500}
        />
        <LuChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menú Desplegable con Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <DropDown
            name={firstName}
            email={user?.email}
            handleDropdown={handleDropdown}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
