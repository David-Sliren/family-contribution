import { cleanIdPlugin } from "@/utils/cleanDatabase";
import { Schema, model, models } from "mongoose";

const contribuitionSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: { type: String },
  },
  { timestamps: true },
);

contribuitionSchema.plugin(cleanIdPlugin);

export const Contribuition =
  models.Contribuition || model("Contribuition", contribuitionSchema);
