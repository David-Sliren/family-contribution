import React from "react";
import { UserRow } from "./UserRow";
import { USER_CONTRIBUTION } from "@/constants/user-contribution";

const HEAD_ROW = [
  {
    text: "Colaborador",
  },
  {
    text: "Monto",
  },
  {
    text: "Fecha",
  },
  {
    text: "Estado",
    className: "text-right",
  },
];

const HeadRow = ({ className, text }) => {
  return (
    <th
      className={`px-8 py-6 text-sm font-bold uppercase tracking-widest text-on-surface-variant ${className}`}
    >
      {text}
    </th>
  );
};

export const UserTable = ({ startIndex, endIndex }) => {
  const visibleUsers = USER_CONTRIBUTION.slice(startIndex, endIndex);

  return (
    <section className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low/50">
            {HEAD_ROW.map((item) => (
              <HeadRow
                key={item.text}
                text={item.text}
                className={item.className}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {visibleUsers.map((item) => (
            <UserRow key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </section>
  );
};
