import { User } from "@/database/user";

export const updateContributionInUser = async (doc, next) => {
  try {
    await User.findByIdAndUpdate(doc.userId, {
      $push: { contributions: doc._id },
    });
  } catch (e) {
    next(e);
  }
};
