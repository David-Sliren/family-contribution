import { Contribution } from "@/database/contribution";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";

export class Contribute {
  static async getAll() {
    await conectToData();

    const contributions = await Contribution.find(
      {},
      { updatedAt: 0 },
    ).populate("userId", {
      name: 1,
      relationship: 1,
      img: 1,
    });

    if (!contributions) {
      const error = new Error("not found countributions");
      error.code = "NOT_FOUND_CONTRIBUTIONS";
      throw error;
    }

    return contributions;
  }

  static async getById(id) {
    await conectToData();

    try {
      const contribution = await Contribution.findById(id);

      if (!contribution) {
        const customError = new Error("not found contribution");
        customError.code = "NOT_FOUND_CONTRIBUTION";
        throw customError;
      }

      return contribution;
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
      if (!user) {
        const customError = new Error("user unathorized");
        customError.code = "USER_UNAUTHORIZED";
        throw customError;
      }

      const saveContribution = new Contribution(data);
      const newContribution = await saveContribution.save();

      if (!newContribution) {
        const customError = new Error("can't contribute");
        customError.code = "CANT_CONTRIBUTE";
        throw customError;
      }

      return newContribution;
    } catch (error) {
      // console.log("error: ", error);
      throw error;
    }
  }
}
