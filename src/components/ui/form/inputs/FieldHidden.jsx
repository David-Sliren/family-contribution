import clsx from "clsx";
import React, { useState } from "react";

export const FieldHidden = ({
  name = "name",
  inputName = "name",
  inputType = "text",
  more = {},
  registerHook = {},
  error = {},
  defaultValue = "",
  className = "",
}) => {
  const [isView, setIsView] = useState(false);

  function handleViewPassword() {
    setIsView(!isView);
  }
  return (
    <div className={clsx("space-y-2 absolute top-2 left-2 w-fit", className)}>
      <div className="relative flex items-center w-fit gap-2">
        <label className="block text-xs font-semibold text-outline/60 tracking-[0.05em] ml-1">
          {name}:
        </label>
        <input
          className="min-w-62 max-h-fit  bg-surface-container-low border-none rounded-2xl transition-all text-xs bg-amber-300 text-outline/60 font-body"
          autoComplete="one-time-code"
          type={inputType}
          disabled={true}
          {...registerHook(inputName, { value: defaultValue })}
          {...more}
        />
      </div>
      {error?.[inputName] && (
        <p className="ml-2 text-[12px] text-red-500">
          {error[inputName]?.message}
        </p>
      )}
    </div>
  );
};
