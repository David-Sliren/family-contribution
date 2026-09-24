import { Card } from "@/components/ui/cards/Card";
import { Chip } from "@/components/dashboard/ui/chips/Chip";
import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { useDeleteInventory } from "@/hooks/tanstack/mutation/useMutationInventory";
import { useNotification } from "@/store/ui/notifications";
import { LuEllipsisVertical, LuPencil, LuTrash2 } from "react-icons/lu";

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
        <button
          className="flex w-full items-center gap-3 px-4 py-2 text-primary hover:bg-surface-container-low cursor-pointer"
          onClick={() => onEdit(inventory)}
        >
          <LuPencil />
          Editar
        </button>
        <button
          className="flex w-full items-center gap-3 px-4 py-2 text-error hover:bg-surface-container-low cursor-pointer"
          onClick={handleDelete}
        >
          <LuTrash2 />
          Eliminar
        </button>
      </DeafultPopover>
    </Card>
  );
}
