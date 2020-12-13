import { Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { userRoleEntitySchema, userRoleRelations } from "../../entities/UserRole";
import { userToUserRoleColumns } from "../../entities/UserToUserRole";
import { UserToUserRoleRow } from "../../entities/UserToUserRole/UserToUserRole.entity.types";
import { UserRoleRepository } from "./UserRole.repository.types";

export const getUserRoleRepository = (connection: Connection): UserRoleRepository => {
	const repo = getTypedRepository(userRoleEntitySchema, connection);

	return {
		findAll: (options) =>
			hasProperty(options, "userId")
				? repo
						.createQueryBuilder("ur")
						.innerJoin(
							`ur.${userRoleRelations.userToUserRoles.name}`,
							"uur",
							`uur.${userToUserRoleColumns.user_id.name} = :userId`,
							identity<{ userId: UserToUserRoleRow["user_id"] }>({
								userId: options.userId,
							})
						)
						.getMany()
				: repo.find(),

		create: (data) => data,

		save: (data) => repo.save(data),
	};
};
