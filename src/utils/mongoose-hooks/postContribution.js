import { User } from "@/database/user";

export const updateContributionInUser = async (doc) => {
  await User.findByIdAndUpdate(doc.userId, {
    $push: { contributions: doc._id },
  });
};
