import { cleanIdPlugin } from "@/utils/mongoose-helper/cleanDatabase";
import { updateContributionInUser } from "@/utils/mongoose-hooks/postContribution";
import { Schema, model, models } from "mongoose";

const contributionSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: { type: String },
    purpose: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

contributionSchema.post("save", updateContributionInUser);

contributionSchema.plugin(cleanIdPlugin);

export const Contribution =
  models.Contribution || model("Contribution", contributionSchema);
