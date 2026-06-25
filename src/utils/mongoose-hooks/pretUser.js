import { Contribution } from "@/database/contribution";

export async function deleteContributionOfUser(next) {
  try {
    await Contribution.deleteMany({ userId: this._id });
  } catch (e) {
    next(e);
  }
}
