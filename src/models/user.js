import "@/database/contribution";
import { User } from "@/database/user";
import { Patients } from "@/models/patient";
import { conectToData } from "@/utils/mongoose-helper/db";

// resuelve el paciente sobre el que se filtran las contribuciones:
// "all" => sin filtro; sin patientId => paciente principal activo
const resolvePatientFilter = async (patientId) => {
  if (patientId) return patientId === "all" ? undefined : patientId;

  const main = await Patients.getMain();

  return main?._id;
};

export class Users {
  static async getAll(querys, paginate, patientId) {
    await conectToData();

    const matchPatient = await resolvePatientFilter(patientId);

    const [user, totalItems] = await Promise.all([
      User.find(querys)
        .populate({
          path: "contributions",
          select: { amount: 1 },
          match: matchPatient ? { patientId: matchPatient } : undefined,
        })
        .sort("-createdAt")
        .skip((paginate.page - 1) * paginate.limit)
        .limit(paginate.limit),
      User.countDocuments(querys),
    ]);

    if (!user) {
      const customError = new Error("not found user");

      customError.code = "NOT_FOUND_USER";

      throw customError;
    }

    const totalPages =
      totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
    const hasNextPage = paginate.page < totalPages;
    const hasPrevPage = paginate.page > 1;

    return {
      data: user,
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

  static async getById(id, patientId) {
    await conectToData();

    try {
      const matchPatient = await resolvePatientFilter(patientId);

      const user = await User.findById(id).populate({
        path: "contributions",
        select: { amount: 1, date: 1, purpose: 1 },
        match: matchPatient ? { patientId: matchPatient } : undefined,
      });

      if (!user) {
        const customError = new Error("not found user");

        customError.code = "NOT_FOUND_USER";

        throw customError;
      }

      return user;
    } catch (error) {
      if (error.name === "CastError") {
        const customError = new Error("invalid id");

        customError.code = "INVALID_ID";

        throw customError;
      }

      throw error;
    }
  }

  static async updateRole(id, role) {
    await conectToData();

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true },
      );

      if (!user) {
        const customError = new Error("not found user");
        customError.code = "NOT_FOUND_USER";
        throw customError;
      }

      return user;
    } catch (error) {
      if (error.name === "CastError") {
        const customError = new Error("invalid id");
        customError.code = "INVALID_ID";
        throw customError;
      }

      throw error;
    }
  }
}
