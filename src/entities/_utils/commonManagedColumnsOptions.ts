export const commonManagedColumnsOptions = {
	created_at: {
		name: "created_at",
		type: "timestamp with time zone",
		nullable: true,
	},
	updated_at: {
		name: "updated_at",
		type: "timestamp with time zone",
		nullable: true,
	},
	deleted_at: {
		name: "deleted_at",
		type: "timestamp with time zone",
		nullable: true,
	},
	created_by_id: {
		name: "created_by_id",
		type: "integer",
		nullable: true,
	},
	updated_by_id: {
		name: "updated_by_id",
		type: "integer",
		nullable: true,
	},
	deleted_by_id: {
		name: "deleted_by_id",
		type: "integer",
		nullable: true,
	},
} as const;
