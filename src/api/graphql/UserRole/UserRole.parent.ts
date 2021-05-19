import { UserRoleRow } from "../../../database/UserRole/UserRole.entity.types";
import { UserRole } from "../schemas.types";

export type UserRoleParent = Required<UserRoleRow> & Pick<UserRole, "__typename">;

export const getUserRoleParent = (userRoleRow: UserRoleRow): UserRoleParent => ({
	__typename: "UserRole",
	...userRoleRow,
});
