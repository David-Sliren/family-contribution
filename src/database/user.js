import { cleanIdPlugin, cleanUser } from "@/utils/cleanDatabase";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "root"],
      default: "user",
      required: true,
    },
    relationship: {
      type: String,
      enum: ["hijo", "sobrino", "esposo", "externo"],
      required: true,
    },
    img: { type: String, default: "" },
    tel: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.plugin(cleanUser);

export const User = models.User || model("User", userSchema);
