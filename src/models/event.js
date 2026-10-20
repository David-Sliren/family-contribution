import { formatMoney } from "@/config/money";
import { Event } from "@/database/event";
import { eventBackendSchema } from "@/schemas/event";
import { conectToData } from "@/utils/mongoose-helper/db";

const descriptions = {
  contribution: {
    creado: (entity) =>
      `Se creó una contribución de ${formatMoney(entity.amount)}`,
    actualizado: (entity) =>
      `Se actualizó una contribución a ${formatMoney(entity.amount)}`,
  },
  expense: {
    creado: (entity) =>
      `Se creó el gasto "${entity.name}" de ${formatMoney(entity.amount)}`,
    actualizado: (entity) =>
      `Se actualizó el gasto "${entity.name}" a ${formatMoney(entity.amount)}`,
    eliminado: (entity) =>
      `Se eliminó el gasto "${entity.name}" de ${formatMoney(entity.amount)}`,
  },
  inventory: {
    creado: (entity) =>
      `Se creó el inventario "${entity.name}" (${entity.totalUnit} unidades)`,
    actualizado: (entity) =>
      `Se actualizó el inventario "${entity.name}" (${entity.totalUnit} unidades)`,
    eliminado: (entity) =>
      `Se eliminó el inventario "${entity.name}" (${entity.totalUnit} unidades)`,
  },
};

export class Events {
  static async getAll(querys, paginate) {
    await conectToData();

    const [events, totalItems] = await Promise.all([
      Event.find(querys)
        .populate("createBy", { name: 1 })
        .sort("-createdAt")
        .skip((paginate.page - 1) * paginate.limit)
        .limit(paginate.limit),
      Event.countDocuments(querys),
    ]);

    if (!events) {
      const customError = new Error("not found events");
      customError.code = "NOT_FOUND_EVENTS";
      throw customError;
    }

    const totalPages =
      totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
    const hasNextPage = paginate.page < totalPages;
    const hasPrevPage = paginate.page > 1;

    return {
      data: events,
      pagination: {
        totalItems,
        totalPages,
        currentPage: paginate.page,
        limit: paginate.limit,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  static async register({ type, action, entity, actor }) {
    try {
      await conectToData();

      const data = {
        type,
        action,
        entityId: entity._id,
        patientId: entity.patientId,
        createBy: actor,
        description: descriptions[type][action](entity),
        amount: entity.amount ?? entity.price ?? 0,
      };

      const result = eventBackendSchema.safeParse(data);

      if (!result.success) {
        console.error(
          "events: payload invalido",
          result.error.issues.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        );
        return null;
      }

      return await Event.create(result.data);
    } catch (error) {
      console.error("events: no se pudo registrar el evento", error.message);
      return null;
    }
  }
}
