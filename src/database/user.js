import { cleanUser } from "@/utils/mongoose-helper/cleanDatabase";
import {
  monthMoreActive,
  totalContributed,
} from "@/utils/mongoose-helper/virtualFuntions";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, sparse: true },
    role: {
      type: String,
      enum: ["user", "carer", "admin"],
      default: "user",
      required: true,
    },
    relationship: {
      type: String,
      enum: ["hijo", "sobrino", "esposo", "hermano", "externo", "nieto"],
      required: true,
    },
    img: { type: String, default: "" },
    tel: { type: String, required: true },
    email: { type: String, default: "" },
    password: { type: String, required: true },
    isDisabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("contributions", {
  ref: "Contribution",
  localField: "_id",
  foreignField: "userId",
});

userSchema.virtual("totalContributed").get(totalContributed);

userSchema.virtual("monthMoreActive").get(monthMoreActive);

userSchema.plugin(cleanUser);

export const User = models.User || model("User", userSchema);
