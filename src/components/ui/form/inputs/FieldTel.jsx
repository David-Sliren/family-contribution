import React from "react";

export const FieldTel = ({ registerHook = {}, error = {} }) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-on-surface-variant tracking-[0.05em] ml-1">
        Telefono
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-5 text-on-surface ">+ 57</span>
        <input
          className="w-full bg-surface-container-low border-none rounded-2xl pl-15 pr-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/60 font-body"
          placeholder="Ej. 3044518133"
          {...registerHook("tel")}
        />
      </div>
      {error?.tel && <p className="ml-2 text-red-500">{error.tel?.message}</p>}
    </div>
  );
};
