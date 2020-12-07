import { Connection } from "typeorm";

import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { userToUserRoleEntitySchema } from "../../entities/UserToUserRole";
import { UserToUserRoleRepository } from "./UserToUserRole.repository.types";

export const getUserToUserRoleRepository = (connection: Connection): UserToUserRoleRepository => {
	const repo = getTypedRepository(userToUserRoleEntitySchema, connection);

	return {
		findAll: () => repo.find(),

		create: (data) => data,

		save: (data) => repo.save(data),
	};
};
