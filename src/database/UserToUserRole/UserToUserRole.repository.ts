import { Connection } from "typeorm";

import { getTypedRepository } from "../_utils/getTypedRepository";
import { userToUserRoleEntitySchema } from "./UserToUserRole.entity";
import { UserToUserRoleRepository } from "./UserToUserRole.repository.types";

export const getUserToUserRoleRepository = (connection: Connection): UserToUserRoleRepository => {
	const repo = getTypedRepository(userToUserRoleEntitySchema, connection);

	return {
		findAll: () => repo.find(),

		save: (data) => repo.save(data),
	};
};
