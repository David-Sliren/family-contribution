import { Contribuition } from "@/components/profile/contibuition/Contribuition";
import { Impact } from "@/components/profile/impact/Impact";
import { User } from "@/components/profile/user/User";
import { userQueryByIdOptions } from "@/hooks/tanstack/query/useQueryUser";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/tanstackQuery-config";

export const metadata = {
  title: "Perfil",
  description:
    "Perfil del miembro de la familia: impacto, contribuciones e historial de aportes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage({ params }) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(userQueryByIdOptions(id));

  return (
    <div className="pt-20 pb-32 px-6 max-w-7xl mx-auto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <User patientId={id} />
        <Impact patientId={id} />
        <Contribuition patientId={id} />
      </HydrationBoundary>
    </div>
  );
}
