import { cleanIdPlugin } from "@/utils/mongoose-helper/cleanDatabase";
import { model, models, Schema } from "mongoose";

const eventSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["contribution", "inventory", "expense"],
    },
    action: {
      type: String,
      required: true,
      enum: ["creado", "actualizado", "eliminado"],
    },
    entityId: { type: Schema.ObjectId, required: true },
    patientId: { type: Schema.ObjectId, ref: "Patient" },
    createBy: { type: Schema.ObjectId, required: true, ref: "User" },
    description: { type: String, required: true },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

eventSchema.plugin(cleanIdPlugin);

export const Event = models.Event || model("Event", eventSchema);
