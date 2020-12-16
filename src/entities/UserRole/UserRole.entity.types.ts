import { BidirectionalRelation } from "../_utils/BidirectionalRelation";
import { FieldColumn, PrimaryColumn } from "../_utils/Column";
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { NamedColumns } from "../_utils/NamedColumns";
import { NamedRelations } from "../_utils/NamedRelations";
import { UserToUserRoleEntitySchema } from "../UserToUserRole/UserToUserRole.entity.types";

export type UserRole_id = PrimaryColumn<"uuid">;
export type UserRole_code = FieldColumn<{ name: "code"; sqlType: "varchar"; nullable: false }>;

export type UserRoleToUserToUserRole_userToUserRoles = BidirectionalRelation<{
	from: {
		entity: UserRoleEntitySchema;
		relationName: "userToUserRoles";
	};
	to: {
		entity: UserToUserRoleEntitySchema;
		columnName: "user_role_id";
		relationName: "userRole";
		nullable: false;
	};
}>;

export type UserRoleColumns = NamedColumns<{
	id: UserRole_id;
	code: UserRole_code;
}>;

export type UserRoleRelations = NamedRelations<{
	userToUserRoles: UserRoleToUserToUserRole_userToUserRoles["from"]["relation"];
}>;

export type UserRoleEntitySchema = TypedEntitySchema<{
	name: "user_role";
	columns: UserRoleColumns;
	relations: UserRoleRelations;
}>;

export type UserRoleRow = EntityRow<UserRoleEntitySchema>;
