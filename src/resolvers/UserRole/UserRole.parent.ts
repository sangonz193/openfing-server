import { UserRoleRow } from "../../entities/UserRole/UserRole.entity.types";
import { UserRole } from "../../generated/graphql.types";

export type UserRoleParent = Required<UserRoleRow> & Pick<UserRole, "__typename">;

export const getUserRoleParent = (userRoleRow: UserRoleRow): UserRoleParent => ({
	__typename: "UserRole",
	...userRoleRow,
});
