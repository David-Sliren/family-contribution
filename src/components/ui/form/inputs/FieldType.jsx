import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export const FieldType = ({
  name = "name",
  inputName = "name",
  inputType = "text",
  inputPlaceholder = "Escribe aqui",
  isPassword = false,
  registerHook = {},
  error = {},
}) => {
  const [isView, setIsView] = useState(false);

  function handleViewPassword() {
    setIsView(!isView);
  }
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-on-surface-variant tracking-[0.05em] ml-1">
        {name}
      </label>
      <div className="relative flex items-center">
        <input
          className="w-full bg-surface-container-low border-none rounded-2xl pl-5 pr-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/60 font-body"
          autoComplete="one-time-code"
          placeholder={inputPlaceholder}
          type={!isPassword ? inputType : isView ? "text" : "password"}
          {...registerHook(inputName)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={handleViewPassword}
            className="absolute text-primary text-xl right-0 mr-5"
          >
            {isView ? <LuEyeClosed /> : <LuEye />}
          </button>
        )}
      </div>
      {error?.[inputName] && (
        <p className="ml-2 text-red-500">{error[inputName]?.message}</p>
      )}
    </div>
  );
};
