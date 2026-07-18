import { Contribution } from "@/database/contribution";

export async function deleteContributionOfUser() {
  await Contribution.deleteMany({ userId: this._id });
}
