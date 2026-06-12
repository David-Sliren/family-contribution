import Link from "next/link";
import React from "react";

export const Info = ({ text = "", linkName = "", url = "" }) => {
  return (
    <span className="text-on-surface-variant w-full flex justify-center gap-1 mt-4">
      {text}
      <Link className="text-primary" href={url}>
        {linkName}
      </Link>
    </span>
  );
};
