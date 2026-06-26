import React from "react";

export const FieldOption = ({ value }) => {
  return (
    <option className="capitalize" value={value}>
      {value}
    </option>
  );
};

const defaultOptions = ["...", "...."];

export const FieldSelect = ({
  registerHook = {},
  fieldValues = defaultOptions,
}) => {
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
          {fieldValues.map((value, id) => (
            <FieldOption key={id} value={value} />
          ))}
        </select>
      </div>
    </div>
  );
};
