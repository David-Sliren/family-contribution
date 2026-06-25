import { hasPassword, verifyHash } from "@/utils/mongoose-helper/crypt";
import { conectToData } from "@/utils/mongoose-helper/db";
import { User } from "@/database/user";
import { SignJWT } from "jose";
import { SECRET } from "@/constants/env";

export class AuthUser {
  static async create(result) {
    await conectToData();

    try {
      const existEmail = await User.findOne({ email: result.email });
      const existUsername = await User.findOne({ email: result.username });

      if (existEmail) {
        const error = new Error("el correo ya esta registrado");
        error.code = "DUPLICATED_EMAIL";
        throw error;
      }

      if (existUsername) {
        const error = new Error("el nombre de usuario ya esta registrado");
        error.code = "DUPLICATED_USERNAME";
        throw error;
      }

      const passwordHash = await hasPassword(result.password);

      const newUser = new User({ ...result, password: passwordHash });
      const saveUser = await newUser.save();
      return saveUser;
    } catch (error) {
      throw error;
    }
  }

  static async login(userData) {
    await conectToData();
    const { username, password } = userData;
    // const SECRET = new TextEncoder().encode(process.env.SECRET_JWT);

    try {
      const findUser = await User.findOne({ username });

      if (!findUser) {
        const error = new Error("el nombre de usuario es invalido");
        error.code = "INVALIDATE_USERNAME";
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
        username: findUser.username,
        role: findUser.role,
      };

      const signUser = new SignJWT(newUser);

      const token = await signUser
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(SECRET);

      return { token };
    } catch (error) {
      throw error;
    }
  }
}
