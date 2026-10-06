import { cleanIdPlugin } from "@/utils/mongoose-helper/cleanDatabase";
import { Schema, model, models } from "mongoose";

const contributionSchema = new Schema(
  {
    paymentId: { type: String, unique: true, sparse: true },
    method: {
      type: String,
      enum: ["pasarela", "efectivo", "transferencia"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ["confirmado", "pendiente"] },
    purpose: {
      type: String,
      required: true,
      enum: ["medicinas", "facturas", "cuidador"],
    },
    date: { type: Date, default: Date.now },
    patientId: { type: Schema.ObjectId, required: true, ref: "Patient" },
    createBy: { type: Schema.ObjectId, required: true, ref: "User" },
    updateBy: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

contributionSchema.plugin(cleanIdPlugin);

export const Contribution =
  models.Contribution || model("Contribution", contributionSchema);
