import { Expense } from "@/database/expense";
import { Patient } from "@/database/patient";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Expenses {
  static async getAll(querys, paginate) {
    await conectToData();

    const [expense, totalItems] = await Promise.all([
      Expense.find(querys)
        .sort("-createdAt")
        .skip((paginate.page - 1) * paginate.limit)
        .limit(paginate.limit),
      Expense.countDocuments(querys),
    ]);

    if (!expense) {
      const customError = new Error("not found expenses");
      customError.code = "NOT_FOUND_EXPENSES";
      throw customError;
    }

    const totalPages =
      totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
    const hasNextPage = paginate.page < totalPages;
    const hasPrevPage = paginate.page > 1;

    return {
      data: expense,
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
      const expense = await Expense.findById(id);

      if (!expense) {
        const customError = new Error("not found expense");
        customError.code = "NOT_FOUND_EXPENSE";
        throw customError;
      }

      return expense;
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

      const saveExpense = new Expense(data);
      const newExpense = await saveExpense.save();

      if (!newExpense) {
        const customError = new Error("can't create expense");
        customError.code = "CANT_CREATE_EXPENSE";
        throw customError;
      }

      return newExpense;
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

      const expense = await Expense.findById(data.id);

      if (!expense) {
        const customError = new Error("not found expense");
        customError.code = "NOT_FOUND_EXPENSE";
        throw customError;
      }

      await expense.deleteOne();

      return expense;
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

      const updateExpense = await Expense.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updateExpense) {
        const customError = new Error("cant update expense");
        customError.code = "CANT_UPDATE_EXPENSE";
        throw customError;
      }

      return updateExpense;
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
