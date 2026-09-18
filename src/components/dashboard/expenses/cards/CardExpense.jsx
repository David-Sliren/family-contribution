import { CardDefaultList } from "@/components/ui/cards/Card";
import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { defaultDate } from "@/config/dates";
import { formatMoney } from "@/config/money";
import { useDeleteExpense } from "@/hooks/tanstack/mutation/useMutationExpense";
import { useNotification } from "@/store/ui/notifications";
import { LuBanknote, LuEllipsisVertical, LuPencil } from "react-icons/lu";

export const ButtonPop = ({ name, handle, icon: Icon }) => {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low transition-colors text-primary text-wrap cursor-pointer"
      onClick={handle}
    >
      <span className="hidden sm:block capitalize">{name}</span>
      <Icon />
    </button>
  );
};

export const CardExpense = ({ expense, handdler = () => "" }) => {
  const { mutateAsync } = useDeleteExpense(expense?.id);
  const setNotification = useNotification((state) => state.setNotification);

  async function handleDeleteExpense() {
    try {
      await mutateAsync();
      setNotification({ message: "Gasto eliminado" });
    } catch (error) {
      setNotification({
        message: error || "No se pudo eliminar el gasto",
        type: "error",
      });
    }
  }

  return (
    <CardDefaultList>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold font-headline-md overflow-hidden">
          <span>
            <LuBanknote />
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-on-surface text-[10px] sm:text-xs">
            {expense?.name}
          </h3>
          <p className="text-[10px] text-on-surface-variant">
            {defaultDate(expense?.date)}
          </p>
          <p className="text-[10px] text-on-surface-variant">
            {expense?.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 relative">
        <span className="sm:block text-primary text-xs w-fit text-right">
          {formatMoney(expense?.amount)}
          <p className="text-[10px] text-on-surface-variant text-right">
            {expense?.category}
          </p>
        </span>
        <button
          popoverTarget={`popover-basic-${expense?.id}`}
          className="relative text-on-surface-variant hover:text-primary transition-colors menu-trigger [anchor-name:--menu] cursor-pointer p-1"
        >
          <LuEllipsisVertical />
        </button>
      </div>
      <DeafultPopover id={expense?.id}>
        <ButtonPop
          name="editar"
          handle={() => handdler(expense)}
          icon={LuPencil}
        />
        <ButtonPop
          name="eliminar"
          handle={handleDeleteExpense}
          icon={LuBanknote}
        />
      </DeafultPopover>
    </CardDefaultList>
  );
};
