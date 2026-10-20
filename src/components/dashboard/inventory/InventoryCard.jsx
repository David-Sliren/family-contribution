import { Card } from "@/components/ui/cards/Card";
import { Chip } from "@/components/dashboard/ui/chips/Chip";
import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { useDeleteInventory } from "@/hooks/tanstack/mutation/useMutationInventory";
import { useNotification } from "@/store/ui/notifications";
import { LuEllipsisVertical, LuPencil, LuTrash2 } from "react-icons/lu";
import { ButtonPop } from "@/components/ui/buttons/ButtonPop";

const statusTone = { "en orden": "success", bajo: "alert", agotado: "alert" };

export function InventoryCard({ inventory, onEdit }) {
  const { mutateAsync } = useDeleteInventory(inventory.id);
  const setNotification = useNotification((state) => state.setNotification);
  const total = inventory.totalUnit || 0;

  async function handleDelete() {
    try {
      await mutateAsync();
      setNotification({ message: "Artículo eliminado" });
    } catch (error) {
      setNotification({
        message: error || "No se pudo eliminar el artículo",
        type: "error",
      });
    }
  }

  return (
    <Card className="p-5">
      <div className="flex justify-between items-start gap-2.5">
        <div>
          <h3 className="text-[17px] font-display tracking-tight text-on-surface m-0">
            {inventory.name}
          </h3>
          <p className="text-[12px] text-on-surface-variant font-body mt-1 mb-0">
            {inventory.concentration || inventory.category}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Chip tone={statusTone[inventory.status] ?? "primary"}>
            {inventory.status}
          </Chip>
          <button
            popoverTarget={`popover-basic-${inventory.id}`}
            className="cursor-pointer p-1 text-on-surface-variant hover:text-primary"
          >
            <LuEllipsisVertical />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between mt-5">
        <strong className="text-[28px] font-display tracking-tight text-on-surface">
          {total}
        </strong>
        <span className="text-[11px] text-on-surface-variant font-body">
          {inventory.category}
        </span>
      </div>

      {inventory.description && (
        <p className="mt-4 text-[11px] text-on-surface-variant">
          {inventory.description}
        </p>
      )}
      <DeafultPopover id={inventory.id}>
        <ButtonPop
          name="editar"
          icon={LuPencil}
          handle={() => onEdit(inventory)}
        />
        <ButtonPop name="eliminar" icon={LuTrash2} handle={handleDelete} />
      </DeafultPopover>
    </Card>
  );
}
