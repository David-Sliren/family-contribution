import {
  cleanIdPlugin,
  cleanUser,
} from "@/utils/mongoose-helper/cleanDatabase";
import { deleteContributionOfUser } from "@/utils/mongoose-hooks/pretUser";
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
    contributions: [{ type: Schema.ObjectId, ref: "Contribution" }],
    isDisabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre("deleteOne", { document: true }, deleteContributionOfUser);

userSchema.virtual("totalContributed").get(totalContributed);

userSchema.virtual("monthMoreActive").get(monthMoreActive);

userSchema.plugin(cleanUser);

export const User = models.User || model("User", userSchema);
