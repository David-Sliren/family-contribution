import React from "react";

export const FormLayout = ({
  children,
  title = "",
  errorNotification = "",
}) => {
  return (
    <div className="w-full md:w-fit bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 tonal-shadow-sm ring-1 ring-outline-variant/15">
      <h1 className="text-primary-container text-2xl mb-6 font-semibold">
        {title}
      </h1>
      {errorNotification && (
        <div className="bg-red-500/30 border border-red-900/40  mb-4 text-red-500 font-light px-2 py-1 rounded-xl">
          {errorNotification}
        </div>
      )}
      {children}
    </div>
  );
};
