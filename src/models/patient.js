import { Patient } from "@/database/patient";
import "@/database/inventory";
import "@/database/expense";
import "@/database/contribution";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Patients {
  // paginate.limit en 0 (default) equivale a sin límite, igual que el find({}) anterior
  static async getAll(querys = {}, paginate = { page: 1, limit: 0 }) {
    await conectToData();

    const [patients, totalItems] = await Promise.all([
      Patient.find(querys)
        .sort("-createdAt")
        .skip((paginate.page - 1) * paginate.limit)
        .limit(paginate.limit),
      Patient.countDocuments(querys),
    ]);

    if (!patients) {
      const customError = new Error("not found patients");
      customError.code = "NOT_FOUND_PATIENTS";
      throw customError;
    }

    const totalPages =
      totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
    const hasNextPage = paginate.page < totalPages;
    const hasPrevPage = paginate.page > 1;

    return {
      data: patients,
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

  static async getMain() {
    await conectToData();

    const mainPatient = await Patient.findOne({ isMain: true });
    if (mainPatient) return mainPatient;

    return await Patient.findOne().sort("createdAt");
  }

  static async getById(id) {
    await conectToData();

    try {
      const patients = await Patient.findById(id)
        .populate("funds")
        .populate("totalInventories")
        .populate("expenses");

      if (!patients) {
        const customError = new Error("not found patient");
        customError.code = "NOT_FOUND_PATIENT";
        throw customError;
      }

      return patients;
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

      if (!user || (user && user.role !== "admin")) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      // el primer paciente (o el primero en no tener principal) queda como principal
      const hasMain = await Patient.exists({ isMain: true });
      if (!hasMain) data.isMain = true;

      const savePatient = new Patient(data);
      const newPatient = await savePatient.save();

      if (!newPatient) {
        const customError = new Error("can't create patient");
        customError.code = "CANT_CREATE_PATIENT";
        throw customError;
      }

      return newPatient;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ id, userId }) {
    await conectToData();
    try {
      const user = await User.findById(userId);
      const patient = await Patient.findById(id);

      if (!patient || !user || (user && user.role !== "admin")) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      await patient.deleteOne();

      return patient;
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

      if (!user || (user && user.role !== "admin")) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }
      const updatePatient = await Patient.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatePatient) {
        const customError = new Error("cant update patient");
        customError.code = "CANT_UPDATE_PATIENT";
        throw customError;
      }

      return updatePatient;
    } catch (error) {
      if (error.name == "CastError") {
        const customError = new Error("invalid id");
        customError.code = "INVALID_ID";
        throw customError;
      }

      throw error;
    }
  }

  static async setMain({ id, updateBy }) {
    await conectToData();

    try {
      const user = await User.findById(updateBy);

      if (!user || (user && user.role !== "admin")) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      // solo puede haber un paciente principal: se quita el principal anterior
      await Patient.updateMany(
        { _id: { $ne: id }, isMain: true },
        { $set: { isMain: false } },
      );

      const patient = await Patient.findByIdAndUpdate(
        id,
        { $set: { isMain: true, updateBy } },
        { new: true },
      );

      if (!patient) {
        const customError = new Error("cant update patient");
        customError.code = "CANT_UPDATE_PATIENT";
        throw customError;
      }

      return patient;
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
