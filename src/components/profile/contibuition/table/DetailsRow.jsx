import { defaultDate } from "@/config/dates";
import { formatMoney } from "@/config/money";
import React from "react";

export const DetailsRow = ({ date, amount, purpose }) => {
  const rowFormatDate = defaultDate(date);
  const rowFormatMoney = formatMoney(amount);

  return (
    <tr className="hover:bg-surface-container-low/50 transition-colors animate-slide-in-left">
      <td className="px-8 py-6 font-body text-on-surface truncate">
        {rowFormatDate}
      </td>
      <td className="px-8 py-6 font-bold text-on-surface text-right truncate">
        {rowFormatMoney}
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-1 sm:justify-end">
          <div className="size-2 rounded-full bg-secondary" />
          <span className="text-on-surface truncate max-w-55">{purpose}</span>
        </div>
      </td>
    </tr>
  );
};
