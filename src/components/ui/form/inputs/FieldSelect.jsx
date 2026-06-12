import React from "react";

export const FieldSelect = ({ registerHook = {} }) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-on-surface-variant tracking-[0.05em] ml-1">
        Parentesco
      </label>
      <div className="relative">
        <select
          className="w-full bg-surface-container-low  border-1 rounded-2xl px-2 py-2 md:py-4 outline-none transition-all text-primary cursor-pointer"
          {...registerHook("relationship")}
        >
          <option value="externo">Externo</option>
          <option className="" value="hijo">
            Hijo
          </option>
          <option className="" value="esposo">
            Esposo
          </option>
          <option className="" value="sobrino">
            Sobrino
          </option>
        </select>
      </div>
    </div>
  );
};
