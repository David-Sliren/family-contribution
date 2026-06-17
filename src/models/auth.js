import { hasPassword, verifyHash } from "@/utils/crypt";
import { conectToData } from "@/utils/db";
import { User } from "@/database/user";
import { SignJWT } from "jose";
import { SECRET } from "@/constants/env";

export class AuthUser {
  static async create(result) {
    await conectToData();

    const existEmail = await User.findOne({ email: result.email });

    if (existEmail) {
      const error = new Error("el correo ya esta registrado");
      error.code = "DUPLICATED_EMAIL";
      throw error;
    }

    const passwordHash = await hasPassword(result.password);

    const newUser = new User({ ...result, password: passwordHash });
    const saveUser = await newUser.save();

    return saveUser;
  }

  static async login(userData) {
    await conectToData();
    const { email, password } = userData;
    // const SECRET = new TextEncoder().encode(process.env.SECRET_JWT);

    const findUser = await User.findOne({ email });

    if (!findUser) {
      const error = new Error("el correo es invalido");
      error.code = "INVALIDATE_EMAIL";
      throw error;
    }

    const veryPassword = await verifyHash(password, findUser.password);

    if (!veryPassword) {
      const error = new Error("la contraseña es incorrecta");
      error.code = "INVALIDATE_PASSWORD";
      throw error;
    }

    const newUser = {
      id: findUser.id,
      role: findUser.role,
    };

    const signUser = new SignJWT(newUser);

    const token = await signUser
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET);

    return { token };
  }
}
