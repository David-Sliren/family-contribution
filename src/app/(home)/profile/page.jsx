import { Contribuition } from "@/components/profile/contibuition/Contribuition";
import { Impact } from "@/components/profile/impact/Impact";
import { User } from "@/components/profile/user/User";

export default function PerfilPage() {
  return (
    <div className="pt-20 pb-32 px-6 max-w-7xl mx-auto">
      <User />
      <Impact />
      <Contribuition />
    </div>
  );
}
