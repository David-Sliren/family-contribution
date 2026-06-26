import { useUserStore } from "@/components/provaider/AuthProvider";
import { logoutUser } from "@/services/user/auth";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuLogOut, LuUser } from "react-icons/lu";

export const DropDown = ({ username = "", email = "", handleDropdown }) => {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  async function handleLogout() {
    try {
      handleDropdown;
      const data = await logoutUser();
      logout();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
        <p className="text-sm font-semibold text-gray-900">{username}</p>
        <p className="text-xs text-gray-500">
          {email ? email : "Actualice su email"}
        </p>
      </div>

      {/* Opciones */}
      <div className="p-2 flex flex-col gap-1">
        <Link
          href="/profile"
          onClick={handleDropdown}
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
        >
          <LuUser size={16} />
          Mi Perfil
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          <LuLogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </motion.div>
  );
};
