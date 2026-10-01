import { Patient } from "@/database/patient";
import { Inventory } from "@/database/inventory";
import { Expense } from "@/database/expense";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Patients {
  static async getAll() {
    await conectToData();

    const patients = await Patient.find({});

    if (!patients) {
      const customError = new Error("not found patients");
      customError.code = "NOT_FOUND_PATIENTS";
      throw customError;
    }

    return patients;
  }

  static async getById(id) {
    await conectToData();

    try {
      const patients = await Patient.findById(id)
        .populate("inventories")
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
      const user = await User.findById(data.userId);

      if (!user || (user && user.role !== "admin")) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

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

  static async delete({ id }) {
    await conectToData();
    try {
      const patient = await Patient.findById(id).populate("userId", {
        role: 1,
      });

      if (!patient || (patient && patient.userId.role !== "admin")) {
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
      const user = await User.findById(data.userId);

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
}
