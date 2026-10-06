import { cleanUser } from "@/utils/mongoose-helper/cleanDatabase";
import {
  monthMoreActive,
  totalContributed,
} from "@/utils/mongoose-helper/virtualFuntions";
import { Schema, model, models } from "mongoose";

/*
  se paso a usar better auth para la autenticación y registro de usuarios.
  se hizo uso de la librería better-auth-mongoose para poder usar el modelo de usuario existente y extenderlo con campos adicionales.
  los campos username, email y password ya no se definen en el modelo de usuario, ya que better auth los maneja internamente.
*/
export const userSchema = new Schema(
  {
    name: { type: String, required: true },
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
  foreignField: "createBy",
});

userSchema.virtual("totalContributed").get(totalContributed);

userSchema.virtual("monthMoreActive").get(monthMoreActive);

userSchema.plugin(cleanUser);

export const User = models.User || model("User", userSchema);
