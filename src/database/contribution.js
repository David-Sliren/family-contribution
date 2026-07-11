import { cleanIdPlugin } from "@/utils/mongoose-helper/cleanDatabase";
import { updateContributionInUser } from "@/utils/mongoose-hooks/postContribution";
import { Schema, model, models } from "mongoose";

const contributionSchema = new Schema(
  {
    paymentId: { type: String, unique: true, sparse: true },
    method: {
      type: String,
      enum: ["pasarela", "efectivo", "transferencia"],
      required: true,
    },
    userId: { type: Schema.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ["confirmado", "pendiente"] },
    purpose: {
      type: String,
      required: true,
      enum: ["medicinas", "facturas", "cuidador"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

contributionSchema.post("save", updateContributionInUser);

contributionSchema.plugin(cleanIdPlugin);

export const Contribution =
  models.Contribution || model("Contribution", contributionSchema);
