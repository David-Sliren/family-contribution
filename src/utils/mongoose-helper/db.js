import { MONGODB_URI } from "@/constants/env";
import mongoose from "mongoose";

if (!MONGODB_URI) {
  throw new Error(
    "La connection to database this bad, please connect to MONGODB_URI",
  );
}

const cached = (global.moongose = { conn: null });

export const conectToData = async () => {
  if (cached.conn) return cached.conn;

  console.log("=> Creando nueva conexión a MongoDB...");
  cached.conn = await mongoose.connect(MONGODB_URI);
  return cached.conn;
};

mongoose.connection.on("connected", () =>
  console.log("=> Conexión exitosa a MongoDB..."),
);

mongoose.connection.on("error", (error) =>
  console.log(`=>  Error en la conexion ... ${error}`),
);
