import * as bcrypt from "bcrypt";

// TODO: Delete
export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 10);
