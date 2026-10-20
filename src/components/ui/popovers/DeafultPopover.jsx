import React from "react";

export const DeafultPopover = ({ children, id }) => {
  return (
    <div
      className=" absolute [position-anchor:menu] [position-area:top_left] w-fit bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(110,54,210,0.06)] border border-primary/15 py-2 z-20 open:flex open:flex-col animate-zoom-in animate-duration-200"
      id={`popover-basic-${id}`}
      popover="auto"
    >
      {children}
    </div>
  );
};
