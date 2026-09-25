"use client";
import { formatMoney } from "@/config/money";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { useUserQueryAll } from "@/hooks/tanstack/query/useQueryUser";
import {
  LuBriefcaseMedical,
  LuHospital,
  LuUsersRound,
  LuWallet,
} from "react-icons/lu";

const StatCard = ({ icon: IconName, title, text }) => {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-[2rem] tonal-shadow-sm flex flex-col justify-between h-48 animate-slide-in-right timeline-view animate-range-early-entry">
      <span className="material-symbols-outlined text-primary text-3xl">
        {IconName}
      </span>
      <div>
        <h3 className="text-on-surface-variant capitalize font-medium text-sm tracking-wide">
          {title}
        </h3>
        <p className="text-2xl capitalize text-gray-950 font-bold">{text}</p>
      </div>
    </div>
  );
};

export const Stats = () => {
  const user = useUserQueryAll({ page: 1, limit: 20 });
  const mainPatient = useMainPatientQuery();

  const wallet =
    user.data?.data?.reduce((acc, item) => acc + item?.totalContributed, 0) ?? 0;

  const countUsersActive =
    user.data?.data?.filter((item) => item?.contributions.length > 0).length ??
    0;

  const STAT_CARD = [
    {
      iconName: <LuWallet />,
      title: "Fondo Disponible",
      more: `${formatMoney(wallet)}`,
    },

    {
      iconName: <LuUsersRound />,
      title: "Colaboradores Activos",
      more:
        countUsersActive === 1
          ? countUsersActive + " Familiar"
          : countUsersActive + " Familiares",
    },

    {
      iconName: <LuBriefcaseMedical />,
      title: "Persona al cuidado",
      more: mainPatient?.data.carerName || "indefinida",
    },

    {
      iconName: <LuHospital />,
      title: "Clinica/Hospital responsable",
      more: mainPatient?.data.clinicName || "indefinida",
    },
  ];

  return (
    <section className="py-12 px-6 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {STAT_CARD.map((item, i) => (
          <StatCard
            key={item.title}
            icon={item.iconName}
            title={item.title}
            text={item.more}
          />
        ))}
      </div>
    </section>
  );
};
