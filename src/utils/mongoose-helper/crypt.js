import bcrypt from "bcrypt";

const SALT_ROUNT = 12;

export const hasPassword = async (password) =>
  await bcrypt.hash(password, SALT_ROUNT);

export const verifyHash = async (password, hash) =>
  await bcrypt.compare(password, hash);
