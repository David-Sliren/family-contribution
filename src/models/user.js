import { Contribution } from "@/database/contribution";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Users {
  static async getAll() {
    await conectToData();

    const user = await User.find({});

    if (!user) {
      const customError = new Error("not found user");

      customError.code = "NOT_FOUND_USER";

      throw customError;
    }

    return user;
  }

  static async getById(id) {
    await conectToData();

    try {
      const user = await User.findById(id).populate("contributions");
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
