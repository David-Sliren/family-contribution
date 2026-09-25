import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Users {
  static async getAll(querys, paginate) {
    await conectToData();

    const [user, totalItems] = await Promise.all([
      User.find(querys)
        .populate("contributions", { amount: 1 })
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

  static async getById(id) {
    await conectToData();

    try {
      const user = await User.findById(id).populate("contributions", {
        amount: 1,
        date: 1,
        purpose: 1,
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
}
