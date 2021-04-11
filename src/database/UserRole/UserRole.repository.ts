import identity from "lodash/identity";
import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { hasProperty } from "../../_utils/hasProperty";
import { getTypedRepository } from "../_utils/getTypedRepository";
import { userToUserRoleColumns } from "../UserToUserRole";
import { UserToUserRoleRow } from "../UserToUserRole/UserToUserRole.entity.types";
import { userRoleEntitySchema, userRoleRelations } from "./UserRole.entity";
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

		create: (data) => ({
			...data,
			id: data.id ?? getUuid(),
		}),

		save: (data) => repo.save(data),
	};
};
