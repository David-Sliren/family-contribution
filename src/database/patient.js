import { cleanIdPlugin } from "@/utils/mongoose-helper/cleanDatabase";
import { model, models, Schema } from "mongoose";

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    img: { type: String, default: "" },
    age: { type: Number, required: true },
    goal: { type: Number, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    carerName: { type: String, default: "" },
    clinicName: { type: String, default: "" },
    isDisabled: { type: Boolean, default: false },
    isMain: { type: Boolean, default: false },
    createBy: { type: Schema.ObjectId, required: true, ref: "User" },
    updateBy: { type: Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

patientSchema.virtual("founds", {
  ref: "Contribution",
  localField: "_id",
  foreignField: "patientId",
});

patientSchema.virtual("inventories", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "patientId",
});

patientSchema.virtual("expenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "patientId",
});

patientSchema.plugin(cleanIdPlugin);

export const Patient = models.Patient || model("Patient", patientSchema);
