import bcrypt from "bcrypt";
import { UserModel, toPublicUser } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

const SALT_ROUNDS = 12;
// Compared against when the email is unknown, so a login takes the same time
// whether or not the account exists.
const DUMMY_HASH = bcrypt.hashSync("solveitly-dummy-password", SALT_ROUNDS);

export async function registerUser(input: RegisterInput) {
  const exists = await UserModel.exists({ email: input.email });
  if (exists) {
    const message = "An account with this email already exists";
    throw new ApiError(409, message, { email: [message] });
  }

  const password = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await UserModel.create({ ...input, password });
  return toPublicUser(user);
}

export async function loginUser({ email, password }: LoginInput) {
  const user = await UserModel.findOne({ email }).select("+password");
  const ok = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
  if (!user || !ok) throw ApiError.unauthorized("Incorrect email or password");
  return toPublicUser(user);
}

export async function getUserById(id: string) {
  const user = await UserModel.findById(id);
  if (!user) throw ApiError.unauthorized("Account no longer exists");
  return toPublicUser(user);
}
