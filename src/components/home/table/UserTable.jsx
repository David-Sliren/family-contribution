"use client";

import { UserRow } from "./UserRow";
import { useContributionQueryAll } from "@/hooks/tanstack/query/useQueryContribution";
import { AnimationEmpty } from "@/lottie-files/components/AnimationEmpty";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { FooterButton } from "@/components/ui/table/FooterButton";

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

export const UserTable = () => {
  const [purpose] = useQueryState("purpose", parseAsString.withDefault(""));
  const [method] = useQueryState("method", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: false }),
  );

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  const { data: contributions } = useContributionQueryAll({
    purpose,
    method,
    status,
    page,
    limit: 10,
  });

  const pagination = contributions.pagination;

  if (contributions.data.length === 0)
    return (
      <section className="relative overflow-x-auto min-h-114">
        <AnimationEmpty />
      </section>
    );

  return (
    <section className="flex flex-col justify-between relative min-h-114 overflow-hidden">
      <div className="flex-1 w-full text-left overflow-x-auto scrollbar-none">
        <table className="w-full">
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
            {contributions.data.map((item) => (
              <UserRow
                key={item.id}
                id={item.createBy.id}
                amount={item.amount}
                date={item.date}
                relationship={item.createBy.relationship}
                userState={item.status}
                userName={item.createBy.name}
                userImg={item.createBy.img}
              />
            ))}
          </tbody>
        </table>
      </div>
      <FooterButton
        current={page}
        isFirstPage={!pagination.hasPrevPage}
        isLastPage={!pagination.hasNextPage}
        prev={handlePrevPage}
        next={handleNextPage}
        last={pagination.totalPages}
      />
    </section>
  );
};
