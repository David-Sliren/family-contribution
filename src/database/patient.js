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
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
);

patientSchema.virtual("funds", {
  ref: "Contribution",
  localField: "_id",
  foreignField: "patientId",
  match: { status: "confirmado" },
});

patientSchema.virtual("totalFunds").get(function () {
  const funds = this.funds;
  if (!Array.isArray(funds)) return 0;
  return funds.reduce((total, fund) => total + fund.amount, 0);
});

patientSchema.virtual("monthFunds").get(function () {
  const funds = this.funds;
  if (!Array.isArray(funds)) return 0;
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  return funds.filter((fund) => new Date(fund.date) >= startOfMonth).length;
});

patientSchema.virtual("totalInventories", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "patientId",
  count: true,
});

patientSchema.virtual("expenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "patientId",
});

patientSchema.virtual("totalExpenses").get(function () {
  const expenses = this.expenses;
  if (!Array.isArray(expenses)) return 0;
  return expenses.reduce((total, expense) => total + expense.amount, 0);
});

patientSchema.virtual("monthExpenses").get(function () {
  const expenses = this.expenses;
  if (!Array.isArray(expenses)) return 0;
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  return expenses
    .filter((expense) => new Date(expense.date) >= startOfMonth)
    .reduce((total, expense) => total + expense.amount, 0);
});

patientSchema.plugin(cleanIdPlugin);

const toJSONOptions = patientSchema.get("toJSON");
patientSchema.set("toJSON", {
  ...toJSONOptions,
  transform: (doc, ret) => {
    delete ret.funds;
    delete ret.expenses;
    return toJSONOptions.transform(doc, ret);
  },
});

export const Patient = models.Patient || model("Patient", patientSchema);
