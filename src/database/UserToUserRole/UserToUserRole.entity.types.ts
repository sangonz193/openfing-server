import { PrimaryColumn } from "../_utils/Column";
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { NamedColumns } from "../_utils/NamedColumns";
import { NamedRelations } from "../_utils/NamedRelations";
import { UserToUserToUserRole_userToUserRoles } from "../User/User.entity.types";
import { UserRoleToUserToUserRole_userToUserRoles } from "../UserRole/UserRole.entity.types";

export type UserToUserRole_id = PrimaryColumn<"uuid">;

export type UserToUserRoleColumns = NamedColumns<{
	id: UserToUserRole_id;

	userRoleId: UserRoleToUserToUserRole_userToUserRoles["to"]["column"];
	userId: UserToUserToUserRole_userToUserRoles["to"]["column"];
}>;

export type UserToUserRoleRelations = NamedRelations<{
	userRole: UserRoleToUserToUserRole_userToUserRoles["to"]["relation"];
	user: UserToUserToUserRole_userToUserRoles["to"]["relation"];
}>;

export type UserToUserRoleEntitySchema = TypedEntitySchema<{
	name: "user_to_user_role";
	columns: UserToUserRoleColumns;
	relations: UserToUserRoleRelations;
}>;

export type UserToUserRoleRow = EntityRow<UserToUserRoleEntitySchema>;
