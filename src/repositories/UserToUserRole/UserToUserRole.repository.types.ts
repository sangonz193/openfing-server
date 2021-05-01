import { SafeOmit } from "../../_utils/utilTypes";
import { UserToUserRoleRow } from "../../entities/UserToUserRole/UserToUserRole.entity.types";

export type SaveUserToUserRoleData = UserToUserRoleRow;

export type CreateUserToUserRoleData = SafeOmit<UserToUserRoleRow, "id"> & Partial<Pick<UserToUserRoleRow, "id">>;

export type UserToUserRoleRepository = {
	findAll: () => Promise<UserToUserRoleRow[]>;

	create: (data: CreateUserToUserRoleData) => SaveUserToUserRoleData;
	save: (data: SaveUserToUserRoleData) => Promise<UserToUserRoleRow>;
};
