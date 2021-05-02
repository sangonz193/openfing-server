import { SafeOmit } from "@sangonz193/utils/SafeOmit";
import { UserRow } from "../User/User.entity.types";
import { UserRoleRow } from "./UserRole.entity.types";

export type SaveUserRoleData = UserRoleRow;

export type CreateUserRoleData = SafeOmit<UserRoleRow, "id"> & Partial<Pick<UserRoleRow, "id">>;

export type UserRoleFindAllOptions =
	| {
			userId: UserRow["id"];
	  }
	| {};

export type UserRoleRepository = {
	findAll: (options: UserRoleFindAllOptions) => Promise<UserRoleRow[]>;

	create: (data: CreateUserRoleData) => SaveUserRoleData;
	save: (data: SaveUserRoleData) => Promise<UserRoleRow>;
};
