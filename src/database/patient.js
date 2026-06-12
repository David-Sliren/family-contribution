import { cleanIdPlugin } from "@/utils/cleanDatabase";
import { model, models, Schema } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    monthlyGoal: { type: Number, required: true },
    currentFounds: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

patientSchema.plugin(cleanIdPlugin);

export const Patient = models.Patient || model("Patient", patientSchema);
