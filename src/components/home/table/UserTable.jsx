import { UserRow } from "./UserRow";
import { useContributionQueryAll } from "@/hooks/tanstack/query/useQueryContribution";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";

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
  const { data, isLoading } = useContributionQueryAll({ limit: 20 });
  const visibleUsers = data?.data?.slice(startIndex, endIndex) ?? [];

  return (
    <section className="relative overflow-x-auto min-h-114">
      {isLoading && <ThreePoints />}
      {visibleUsers.length === 0 ? (
        <AnimationEmpy />
      ) : (
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
              <UserRow
                key={item.id}
                id={item.userId.id}
                amount={item.amount}
                date={item.date}
                relationship={item.userId.relationship}
                userState={item.status}
                userName={item.userId.name}
                userImg={item.userId.img}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
