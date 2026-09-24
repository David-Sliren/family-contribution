import { Inventory } from "@/database/inventory";
import { Patient } from "@/database/patient";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Inventories {
  static async getAll(querys, paginate) {
    await conectToData();

    const [inventory, totalItems] = await Promise.all([
      Inventory.find(querys)
        .sort("-createdAt")
        .skip((paginate.page - 1) * paginate.limit)
        .limit(paginate.limit),
      Inventory.countDocuments(querys),
    ]);

    if (!inventory) {
      const customError = new Error("not found inventory");
      customError.code = "NOT_FOUND_INVENTORY";
      throw customError;
    }

    const totalPages =
      totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
    const hasNextPage = paginate.page < totalPages;
    const hasPrevPage = paginate.page > 1;

    return {
      data: inventory,
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

  static async getById(id) {
    await conectToData();

    try {
      const inventory = await Inventory.findById(id);

      if (!inventory) {
        const customError = new Error("not found inventory");
        customError.code = "NOT_FOUND_INVENTORY";
        throw customError;
      }

      return inventory;
    } catch (error) {
      if (error.name == "CastError") {
        const customError = new Error("invalid id");
        customError.code = "INVALID_ID";
        throw customError;
      }
      throw error;
    }
  }

  static async create(data) {
    await conectToData();

    try {
      const user = await User.findById(data.createBy);

      if (!user || (user && user.role === "user")) {
        const customError = new Error("user unauthorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      const patient = await Patient.findById(data.patientId);

      if (!patient) {
        const customError = new Error("patient not found");
        customError.code = "PATIENT_NOT_FOUND";
        throw customError;
      }

      const saveInventory = new Inventory(data);
      const newInventory = await saveInventory.save();

      if (!newInventory) {
        const customError = new Error("can't create inventory");
        customError.code = "CANT_CREATE_INVENTORY";
        throw customError;
      }

      return newInventory;
    } catch (error) {
      throw error;
    }
  }

  static async delete(data) {
    await conectToData();
    try {
      const user = await User.findById(data.userId);

      if (!user || (user && user.role === "user")) {
        const customError = new Error("user unauthorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      const inventory = await Inventory.findById(data.id);

      if (!inventory) {
        const customError = new Error("not found inventory");
        customError.code = "NOT_FOUND_INVENTORY";
        throw customError;
      }

      await inventory.deleteOne();

      return inventory;
    } catch (error) {
      if (error.name == "CastError") {
        const customError = new Error("invalid id");
        customError.code = "INVALID_ID";
        throw customError;
      }
      throw error;
    }
  }

  static async update(id, data) {
    await conectToData();

    try {
      const user = await User.findById(data.updateBy);

      if (!user || (user && user.role === "user")) {
        const customError = new Error("user unauthorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      const updateInventory = await Inventory.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updateInventory) {
        const customError = new Error("cant update inventory");
        customError.code = "CANT_UPDATE_INVENTORY";
        throw customError;
      }

      return updateInventory;
    } catch (error) {
      if (error.name == "CastError") {
        const customError = new Error("invalid id");
        customError.code = "INVALID_ID";
        throw customError;
      }

      throw error;
    }
  }
}
