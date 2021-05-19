import { ColumnsOptions } from "../_utils/ColumnsOptions";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { RelationsOptions } from "../_utils/RelationsOptions";
import {
	UserToUserRoleColumns,
	UserToUserRoleEntitySchema,
	UserToUserRoleRelations,
} from "./UserToUserRole.entity.types";

// TODO: Delete

export const userToUserRoleColumns: ColumnsOptions<UserToUserRoleColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},
	user_id: {
		name: "user_id",
		type: "uuid",
	},
	user_role_id: {
		name: "user_role_id",
		type: "uuid",
	},
};

export const userToUserRoleRelations: RelationsOptions<UserToUserRoleRelations> = {
	user: {
		name: "user",
		type: "many-to-one",
		inverseSide: "userToUserRoles",
		target: "user",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
	},
	userRole: {
		name: "userRole",
		type: "many-to-one",
		inverseSide: "userToUserRoles",
		target: "user_role",
		joinColumn: {
			name: "user_role_id",
			referencedColumnName: "id",
		},
	},
};

export const userToUserRoleEntitySchema = createTypedEntitySchema<UserToUserRoleEntitySchema>({
	name: "user_to_user_role",
	columns: userToUserRoleColumns,
	relations: userToUserRoleRelations,
});
