import { compare } from "bcrypt";

import { Context } from "../../Context";
import { UserRow } from "../../entities/User/User.entity.types";

export const getUserFromSecret = async (secret: string, context: Context): Promise<UserRow | null> => {
	const user = await context.dataLoaders.user.load({ email: "open@fing.edu.uy" });

	if (!user) return null;

	const isSamePassword = await new Promise<boolean>((resolve) =>
		compare(secret, user.password, (err, same) => {
			if (err) resolve(false);
			else resolve(same);
		})
	);

	return isSamePassword ? user : null;
};
