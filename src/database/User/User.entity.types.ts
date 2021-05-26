import { CourseClassEntitySchema } from "../../database/CourseClass/CourseClass.entity.types"
import { FaqEntitySchema } from "../../database/Faq/Faq.entity.types"
import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { FieldColumn, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseEntitySchema } from "../Course/Course.entity.types"
import { CourseClassChapterCueEntitySchema } from "../CourseClassChapterCue/CourseClassChapterCue.entity.types"
import { CourseClassListEntitySchema } from "../CourseClassList/CourseClassList.entity.types"
import { CourseClassVideoEntitySchema } from "../CourseClassVideo/CourseClassVideo.entity.types"
import { CourseClassVideoFormatEntitySchema } from "../CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import { CourseClassVideoQualityEntitySchema } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import { CourseEditionEntitySchema } from "../CourseEdition/CourseEdition.entity.types"
import { UserToUserRoleEntitySchema } from "../UserToUserRole/UserToUserRole.entity.types"

export type User_id = PrimaryColumn<"uuid">
export type User_email = FieldColumn<{ name: "email"; sqlType: "varchar"; nullable: false }>
export type User_uid = FieldColumn<{ name: "uid"; sqlType: "varchar" }>
export type User_password = FieldColumn<{ name: "password"; sqlType: "text"; nullable: false }>
export type User_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type User_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type User_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type User_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type UserToCourse_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourses"
	}
	to: {
		entity: CourseEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourse_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourses"
	}
	to: {
		entity: CourseEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourse_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourses"
	}
	to: {
		entity: CourseEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseEdition_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseEditions"
	}
	to: {
		entity: CourseEditionEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseEdition_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseEditions"
	}
	to: {
		entity: CourseEditionEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseEdition_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseEditions"
	}
	to: {
		entity: CourseEditionEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClassList_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClassLists"
	}
	to: {
		entity: CourseClassListEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClassList_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClassLists"
	}
	to: {
		entity: CourseClassListEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClassList_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClassLists"
	}
	to: {
		entity: CourseClassListEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClass_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClasses"
	}
	to: {
		entity: CourseClassEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClass_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClasses"
	}
	to: {
		entity: CourseClassEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClass_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClasses"
	}
	to: {
		entity: CourseClassEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideo_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClassVideos"
	}
	to: {
		entity: CourseClassVideoEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClassVideo_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClassVideos"
	}
	to: {
		entity: CourseClassVideoEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideo_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClassVideos"
	}
	to: {
		entity: CourseClassVideoEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClassChapterCue_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClassChapterCues"
	}
	to: {
		entity: CourseClassChapterCueEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClassChapterCue_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClassChapterCues"
	}
	to: {
		entity: CourseClassChapterCueEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClassChapterCue_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClassChapterCues"
	}
	to: {
		entity: CourseClassChapterCueEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoQuality_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClassVideoQualities"
	}
	to: {
		entity: CourseClassVideoQualityEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoQuality_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClassVideoQualities"
	}
	to: {
		entity: CourseClassVideoQualityEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoQuality_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClassVideoQualities"
	}
	to: {
		entity: CourseClassVideoQualityEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoFormat_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdCourseClassVideoFormats"
	}
	to: {
		entity: CourseClassVideoFormatEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoFormat_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedCourseClassVideoFormats"
	}
	to: {
		entity: CourseClassVideoFormatEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToCourseClassVideoFormat_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedCourseClassVideoFormats"
	}
	to: {
		entity: CourseClassVideoFormatEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToFaq_createdBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "createdFaqs"
	}
	to: {
		entity: FaqEntitySchema
		columnName: "created_by_id"
		relationName: "createdBy"
		nullable: true
	}
}>

export type UserToFaq_updatedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "updatedFaqs"
	}
	to: {
		entity: FaqEntitySchema
		columnName: "updated_by_id"
		relationName: "updatedBy"
		nullable: true
	}
}>

export type UserToFaq_deletedBy = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "deletedFaqs"
	}
	to: {
		entity: FaqEntitySchema
		columnName: "deleted_by_id"
		relationName: "deletedBy"
		nullable: true
	}
}>

export type UserToUserToUserRole_userToUserRoles = BidirectionalRelation<{
	from: {
		entity: UserEntitySchema
		relationName: "userToUserRoles"
	}
	to: {
		entity: UserToUserRoleEntitySchema
		columnName: "user_id"
		relationName: "user"
		nullable: false
	}
}>

export type UserColumns = NamedColumns<{
	id: User_id

	email: User_email
	uid: User_uid
	password: User_password
	name: User_name

	createdAt: User_createdAt
	updatedAt: User_updatedAt
	deletedAt: User_deletedAt
}>

export type UserRelations = NamedRelations<{
	createdCourses: UserToCourse_createdBy["from"]["relation"]
	updatedCourses: UserToCourse_updatedBy["from"]["relation"]
	deletedCourses: UserToCourse_deletedBy["from"]["relation"]

	createdCourseEditions: UserToCourseEdition_createdBy["from"]["relation"]
	updatedCourseEditions: UserToCourseEdition_updatedBy["from"]["relation"]
	deletedCourseEditions: UserToCourseEdition_deletedBy["from"]["relation"]

	createdCourseClassLists: UserToCourseClassList_createdBy["from"]["relation"]
	updatedCourseClassLists: UserToCourseClassList_updatedBy["from"]["relation"]
	deletedCourseClassLists: UserToCourseClassList_deletedBy["from"]["relation"]

	createdCourseClasses: UserToCourseClass_createdBy["from"]["relation"]
	updatedCourseClasses: UserToCourseClass_updatedBy["from"]["relation"]
	deletedCourseClasses: UserToCourseClass_deletedBy["from"]["relation"]

	createdCourseClassVideos: UserToCourseClassVideo_createdBy["from"]["relation"]
	updatedCourseClassVideos: UserToCourseClassVideo_updatedBy["from"]["relation"]
	deletedCourseClassVideos: UserToCourseClassVideo_deletedBy["from"]["relation"]

	createdCourseClassVideoQualities: UserToCourseClassVideoQuality_createdBy["from"]["relation"]
	updatedCourseClassVideoQualities: UserToCourseClassVideoQuality_updatedBy["from"]["relation"]
	deletedCourseClassVideoQualities: UserToCourseClassVideoQuality_deletedBy["from"]["relation"]

	createdCourseClassVideoFormats: UserToCourseClassVideoFormat_createdBy["from"]["relation"]
	updatedCourseClassVideoFormats: UserToCourseClassVideoFormat_updatedBy["from"]["relation"]
	deletedCourseClassVideoFormats: UserToCourseClassVideoFormat_deletedBy["from"]["relation"]

	createdFaqs: UserToFaq_createdBy["from"]["relation"]
	updatedFaqs: UserToFaq_updatedBy["from"]["relation"]
	deletedFaqs: UserToFaq_deletedBy["from"]["relation"]

	userToUserRoles: UserToUserToUserRole_userToUserRoles["from"]["relation"]
}>

export type UserEntitySchema = TypedEntitySchema<{
	name: "user"
	columns: UserColumns
	relations: UserRelations
}>

export type UserRow = EntityRow<UserEntitySchema>
