import { identityMap } from "../../_utils/identityMap";
import { ColumnsOptions } from "../_utils/ColumnsOptions";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { RelationsOptions } from "../_utils/RelationsOptions";
import { UserRoleColumns, UserRoleEntitySchema, UserRoleRelations } from "./UserRole.entity.types";

export const UserRoleCode = identityMap<"admin" | "user">({
	admin: "",
	user: "",
});

export const userRoleColumns: ColumnsOptions<UserRoleColumns> = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},
	code: {
		name: "code",
		type: "varchar",
	},
};

export const userRoleRelations: RelationsOptions<UserRoleRelations> = {
	userToUserRoles: {
		name: "userToUserRoles",
		type: "one-to-many",
		inverseSide: "userRole",
		target: "user_to_user_role",
	},
};

export const userRoleEntitySchema = createTypedEntitySchema<UserRoleEntitySchema>({
	name: "user_role",
	columns: userRoleColumns,
	relations: userRoleRelations,
});
