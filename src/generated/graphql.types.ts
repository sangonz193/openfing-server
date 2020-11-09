/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";

import { OptionalUndefinedKeys, SafeOmit } from "../_utils/utilTypes";
import { Context } from "../Context";
import { CourseParent } from "../resolvers/Course/Course.parent";
import { CourseClassParent } from "../resolvers/CourseClass/CourseClass.parent";
import { CourseClassChapterCueParent } from "../resolvers/CourseClassChapterCue/CourseClassChapterCue.parent";
import { CourseClassListParent } from "../resolvers/CourseClassList/CourseClassList.parent";
import { CourseClassVideoParent } from "../resolvers/CourseClassVideo/CourseClassVideo.parent";
import { CourseClassVideoFormatParent } from "../resolvers/CourseClassVideoFormat/CourseClassVideoFormat.parent";
import { CourseClassVideoQualityParent } from "../resolvers/CourseClassVideoQuality/CourseClassVideoQuality.parent";
import { CourseEditionParent } from "../resolvers/CourseEdition/CourseEdition.parent";
import { CreateCourseClassListPayloadParent } from "../resolvers/CreateCourseClassListPayload/CreateCourseClassListPayload.parent";
import { CreateCoursePayloadParent } from "../resolvers/CreateCoursePayload/CreateCoursePayload.parent";
import { FaqParent } from "../resolvers/Faq/Faq.parent";
import { UserParent } from "../resolvers/User/User.parent";
import { UserRoleParent } from "../resolvers/UserRole/UserRole.parent";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
	{ [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Void: any;
};

export type Mutation = {
	__typename: "Mutation";
	_?: Maybe<Scalars["Void"]>;
	backupDb?: Maybe<Scalars["Void"]>;
	createCourse: CreateCourseResult;
	createCourseClassList: CreateCourseClassListResult;
	resetDatabaseFromBackup?: Maybe<Scalars["String"]>;
	updateCourseClassVideos?: Maybe<NotFoundError>;
};

export type MutationBackupDbArgs = {
	secret: Scalars["String"];
};

export type MutationCreateCourseArgs = {
	input: CreateCourseInput;
	secret: Scalars["String"];
};

export type MutationCreateCourseClassListArgs = {
	input: CreateCourseClassListInput;
	secret: Scalars["String"];
};

export type MutationResetDatabaseFromBackupArgs = {
	secret: Scalars["String"];
};

export type MutationUpdateCourseClassVideosArgs = {
	courseClassId: Scalars["ID"];
	secret: Scalars["String"];
};

export type GenericError = {
	__typename: "GenericError";
	_?: Maybe<Scalars["Void"]>;
};

export type NotFoundError = {
	__typename: "NotFoundError";
	_?: Maybe<Scalars["Void"]>;
};

export type AuthenticationError = {
	__typename: "AuthenticationError";
	_?: Maybe<Scalars["Void"]>;
};

export type Course = {
	__typename: "Course";
	id: Scalars["ID"];
	code: Scalars["String"];
	name: Scalars["String"];
	iconUrl?: Maybe<Scalars["String"]>;
	eva?: Maybe<Scalars["String"]>;
	editions: CourseEdition[];
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
};

export type CourseClass = {
	__typename: "CourseClass";
	id: Scalars["ID"];
	number?: Maybe<Scalars["Int"]>;
	name?: Maybe<Scalars["String"]>;
	videos: CourseClassVideo[];
	chapterCues: CourseClassChapterCue[];
	courseClassList?: Maybe<CourseClassList>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
};

export type CourseClassChapterCue = {
	__typename: "CourseClassChapterCue";
	id: Scalars["ID"];
	name: Scalars["String"];
	startSeconds: Scalars["Float"];
	endSeconds: Scalars["Float"];
	courseClass?: Maybe<CourseClass>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
};

export type CourseClassList = {
	__typename: "CourseClassList";
	id: Scalars["ID"];
	code: Scalars["String"];
	name?: Maybe<Scalars["String"]>;
	classes?: Maybe<CourseClass[]>;
	courseEdition?: Maybe<CourseEdition>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
};

export type CourseClassListRefById = {
	id: Scalars["ID"];
};

export type CourseClassListRefByCode = {
	code: Scalars["String"];
};

export type CourseClassListRef = {
	byId?: Maybe<CourseClassListRefById>;
	byCode?: Maybe<CourseClassListRefByCode>;
};

export type CourseClassVideo = {
	__typename: "CourseClassVideo";
	id: Scalars["ID"];
	name?: Maybe<Scalars["String"]>;
	qualities: CourseClassVideoQuality[];
	courseClass?: Maybe<CourseClass>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
};

export type CourseClassVideoFormat = {
	__typename: "CourseClassVideoFormat";
	id: Scalars["ID"];
	name?: Maybe<Scalars["String"]>;
	url?: Maybe<Scalars["String"]>;
	hasTorrent?: Maybe<Scalars["Boolean"]>;
	quality?: Maybe<CourseClassVideoQuality>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
};

export type CourseClassVideoQuality = {
	__typename: "CourseClassVideoQuality";
	id: Scalars["ID"];
	height?: Maybe<Scalars["Int"]>;
	width?: Maybe<Scalars["Int"]>;
	video?: Maybe<CourseClassVideo>;
	formats: CourseClassVideoFormat[];
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
};

export type CourseEdition = {
	__typename: "CourseEdition";
	id: Scalars["ID"];
	name?: Maybe<Scalars["String"]>;
	semester?: Maybe<Scalars["Int"]>;
	year?: Maybe<Scalars["Int"]>;
	courseClassLists: CourseClassList[];
	course?: Maybe<Course>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	updatedBy?: Maybe<User>;
	deletedBy?: Maybe<User>;
};

export type Faq = {
	__typename: "Faq";
	id: Scalars["ID"];
	title: Scalars["String"];
	content: Scalars["String"];
	isHtml?: Maybe<Scalars["Boolean"]>;
	createdAt?: Maybe<Scalars["String"]>;
	createdBy?: Maybe<User>;
	updatedAt?: Maybe<Scalars["String"]>;
	updatedBy?: Maybe<User>;
	deletedAt?: Maybe<Scalars["String"]>;
	deletedBy?: Maybe<User>;
};

export type CreateCourseInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED";

export type CreateCourseInput = {
	code: Scalars["String"];
	name: Scalars["String"];
	eva?: Maybe<Scalars["String"]>;
	visibility?: Maybe<CreateCourseInputVisibility>;
};

export type CreateCoursePayload = {
	__typename: "CreateCoursePayload";
	course: Course;
};

export type CreateCourseResult = CreateCoursePayload | GenericError | AuthenticationError;

export type CreateCourseClassListInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED";

export type CreateCourseClassListInput = {
	courseCode: Scalars["String"];
	code: Scalars["String"];
	name: Scalars["String"];
	semester: Scalars["Int"];
	year: Scalars["Int"];
	visibility?: Maybe<CreateCourseClassListInputVisibility>;
};

export type CreateCourseClassListPayload = {
	__typename: "CreateCourseClassListPayload";
	courseClassList: CourseClassList;
};

export type CreateCourseClassListResult = CreateCourseClassListPayload | GenericError | AuthenticationError;

export type Query = {
	__typename: "Query";
	_?: Maybe<Scalars["Void"]>;
	courseByCode: CourseByCodeResult;
	courseById: CourseByIdResult;
	courseClassById: CourseClassByIdResult;
	courseClassListByCode: CourseClassListByCodeResult;
	courseClassListById: CourseClassListByIdResult;
	courseEditionById: CourseEditionByIdResult;
	courses: Course[];
	faqs: Faq[];
	latestCourseClasses: CourseClass[];
	userRoles: UserRole[];
};

export type QueryCourseByCodeArgs = {
	code: Scalars["String"];
};

export type QueryCourseByIdArgs = {
	id: Scalars["ID"];
};

export type QueryCourseClassByIdArgs = {
	id: Scalars["ID"];
};

export type QueryCourseClassListByCodeArgs = {
	code: Scalars["String"];
};

export type QueryCourseClassListByIdArgs = {
	id: Scalars["ID"];
};

export type QueryCourseEditionByIdArgs = {
	id: Scalars["ID"];
};

export type CourseByCodeResult = Course | NotFoundError;

export type CourseByIdResult = Course | NotFoundError;

export type CourseClassByIdResult = CourseClass | NotFoundError;

export type CourseClassListByCodeResult = CourseClassList | NotFoundError;

export type CourseClassListByIdResult = CourseClassList | NotFoundError;

export type CourseEditionByIdResult = CourseEdition | NotFoundError;

export type User = {
	__typename: "User";
	id: Scalars["ID"];
	email: Scalars["String"];
	name?: Maybe<Scalars["String"]>;
	uid?: Maybe<Scalars["String"]>;
	roles: UserRole[];
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
};

export type UserRole = {
	__typename: "UserRole";
	id: Scalars["ID"];
	code: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
	selectionSet: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
	| LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
	| NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Void: ResolverTypeWrapper<Scalars["Void"]>;
	Mutation: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	GenericError: ResolverTypeWrapper<GenericError>;
	NotFoundError: ResolverTypeWrapper<NotFoundError>;
	AuthenticationError: ResolverTypeWrapper<AuthenticationError>;
	Course: ResolverTypeWrapper<CourseParent>;
	CourseClass: ResolverTypeWrapper<CourseClassParent>;
	Int: ResolverTypeWrapper<Scalars["Int"]>;
	CourseClassChapterCue: ResolverTypeWrapper<CourseClassChapterCueParent>;
	Float: ResolverTypeWrapper<Scalars["Float"]>;
	CourseClassList: ResolverTypeWrapper<CourseClassListParent>;
	CourseClassListRefById: CourseClassListRefById;
	CourseClassListRefByCode: CourseClassListRefByCode;
	CourseClassListRef: CourseClassListRef;
	CourseClassVideo: ResolverTypeWrapper<CourseClassVideoParent>;
	CourseClassVideoFormat: ResolverTypeWrapper<CourseClassVideoFormatParent>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
	CourseClassVideoQuality: ResolverTypeWrapper<CourseClassVideoQualityParent>;
	CourseEdition: ResolverTypeWrapper<CourseEditionParent>;
	Faq: ResolverTypeWrapper<FaqParent>;
	CreateCourseInputVisibility: CreateCourseInputVisibility;
	CreateCourseInput: CreateCourseInput;
	CreateCoursePayload: ResolverTypeWrapper<CreateCoursePayloadParent>;
	CreateCourseResult:
		| ResolversTypes["CreateCoursePayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"];
	CreateCourseClassListInputVisibility: CreateCourseClassListInputVisibility;
	CreateCourseClassListInput: CreateCourseClassListInput;
	CreateCourseClassListPayload: ResolverTypeWrapper<CreateCourseClassListPayloadParent>;
	CreateCourseClassListResult:
		| ResolversTypes["CreateCourseClassListPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"];
	Query: ResolverTypeWrapper<{}>;
	CourseByCodeResult: ResolversTypes["Course"] | ResolversTypes["NotFoundError"];
	CourseByIdResult: ResolversTypes["Course"] | ResolversTypes["NotFoundError"];
	CourseClassByIdResult: ResolversTypes["CourseClass"] | ResolversTypes["NotFoundError"];
	CourseClassListByCodeResult: ResolversTypes["CourseClassList"] | ResolversTypes["NotFoundError"];
	CourseClassListByIdResult: ResolversTypes["CourseClassList"] | ResolversTypes["NotFoundError"];
	CourseEditionByIdResult: ResolversTypes["CourseEdition"] | ResolversTypes["NotFoundError"];
	User: ResolverTypeWrapper<UserParent>;
	UserRole: ResolverTypeWrapper<UserRoleParent>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Void: Scalars["Void"];
	Mutation: {};
	String: Scalars["String"];
	ID: Scalars["ID"];
	GenericError: GenericError;
	NotFoundError: NotFoundError;
	AuthenticationError: AuthenticationError;
	Course: CourseParent;
	CourseClass: CourseClassParent;
	Int: Scalars["Int"];
	CourseClassChapterCue: CourseClassChapterCueParent;
	Float: Scalars["Float"];
	CourseClassList: CourseClassListParent;
	CourseClassListRefById: CourseClassListRefById;
	CourseClassListRefByCode: CourseClassListRefByCode;
	CourseClassListRef: CourseClassListRef;
	CourseClassVideo: CourseClassVideoParent;
	CourseClassVideoFormat: CourseClassVideoFormatParent;
	Boolean: Scalars["Boolean"];
	CourseClassVideoQuality: CourseClassVideoQualityParent;
	CourseEdition: CourseEditionParent;
	Faq: FaqParent;
	CreateCourseInput: CreateCourseInput;
	CreateCoursePayload: CreateCoursePayloadParent;
	CreateCourseResult:
		| ResolversParentTypes["CreateCoursePayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"];
	CreateCourseClassListInput: CreateCourseClassListInput;
	CreateCourseClassListPayload: CreateCourseClassListPayloadParent;
	CreateCourseClassListResult:
		| ResolversParentTypes["CreateCourseClassListPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"];
	Query: {};
	CourseByCodeResult: ResolversParentTypes["Course"] | ResolversParentTypes["NotFoundError"];
	CourseByIdResult: ResolversParentTypes["Course"] | ResolversParentTypes["NotFoundError"];
	CourseClassByIdResult: ResolversParentTypes["CourseClass"] | ResolversParentTypes["NotFoundError"];
	CourseClassListByCodeResult: ResolversParentTypes["CourseClassList"] | ResolversParentTypes["NotFoundError"];
	CourseClassListByIdResult: ResolversParentTypes["CourseClassList"] | ResolversParentTypes["NotFoundError"];
	CourseEditionByIdResult: ResolversParentTypes["CourseEdition"] | ResolversParentTypes["NotFoundError"];
	User: UserParent;
	UserRole: UserRoleParent;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
	name: "Void";
}

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	backupDb: Resolver<
		Maybe<ResolversTypes["Void"]>,
		ParentType,
		ContextType,
		RequireFields<MutationBackupDbArgs, "secret">
	>;
	createCourse: Resolver<
		ResolversTypes["CreateCourseResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseArgs, "input" | "secret">
	>;
	createCourseClassList: Resolver<
		ResolversTypes["CreateCourseClassListResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClassListArgs, "input" | "secret">
	>;
	resetDatabaseFromBackup: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType,
		RequireFields<MutationResetDatabaseFromBackupArgs, "secret">
	>;
	updateCourseClassVideos: Resolver<
		Maybe<ResolversTypes["NotFoundError"]>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseClassVideosArgs, "courseClassId" | "secret">
	>;
};

export type GenericErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["GenericError"] = ResolversParentTypes["GenericError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type NotFoundErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["NotFoundError"] = ResolversParentTypes["NotFoundError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthenticationErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["AuthenticationError"] = ResolversParentTypes["AuthenticationError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Course"] = ResolversParentTypes["Course"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	iconUrl: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	eva: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	editions: Resolver<Array<ResolversTypes["CourseEdition"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClass"] = ResolversParentTypes["CourseClass"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	number: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	videos: Resolver<Array<ResolversTypes["CourseClassVideo"]>, ParentType, ContextType>;
	chapterCues: Resolver<Array<ResolversTypes["CourseClassChapterCue"]>, ParentType, ContextType>;
	courseClassList: Resolver<Maybe<ResolversTypes["CourseClassList"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassChapterCueResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassChapterCue"] = ResolversParentTypes["CourseClassChapterCue"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	startSeconds: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	endSeconds: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	courseClass: Resolver<Maybe<ResolversTypes["CourseClass"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassListResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassList"] = ResolversParentTypes["CourseClassList"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	classes: Resolver<Maybe<Array<ResolversTypes["CourseClass"]>>, ParentType, ContextType>;
	courseEdition: Resolver<Maybe<ResolversTypes["CourseEdition"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassVideoResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassVideo"] = ResolversParentTypes["CourseClassVideo"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	qualities: Resolver<Array<ResolversTypes["CourseClassVideoQuality"]>, ParentType, ContextType>;
	courseClass: Resolver<Maybe<ResolversTypes["CourseClass"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassVideoFormatResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassVideoFormat"] = ResolversParentTypes["CourseClassVideoFormat"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	url: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	hasTorrent: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
	quality: Resolver<Maybe<ResolversTypes["CourseClassVideoQuality"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassVideoQualityResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassVideoQuality"] = ResolversParentTypes["CourseClassVideoQuality"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	height: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	width: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	video: Resolver<Maybe<ResolversTypes["CourseClassVideo"]>, ParentType, ContextType>;
	formats: Resolver<Array<ResolversTypes["CourseClassVideoFormat"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseEditionResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseEdition"] = ResolversParentTypes["CourseEdition"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	semester: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	year: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	courseClassLists: Resolver<Array<ResolversTypes["CourseClassList"]>, ParentType, ContextType>;
	course: Resolver<Maybe<ResolversTypes["Course"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FaqResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Faq"] = ResolversParentTypes["Faq"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	content: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	isHtml: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CreateCoursePayloadResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CreateCoursePayload"] = ResolversParentTypes["CreateCoursePayload"]
> = {
	course: Resolver<ResolversTypes["Course"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CreateCourseResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CreateCourseResult"] = ResolversParentTypes["CreateCourseResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCoursePayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>;
};

export type CreateCourseClassListPayloadResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CreateCourseClassListPayload"] = ResolversParentTypes["CreateCourseClassListPayload"]
> = {
	courseClassList: Resolver<ResolversTypes["CourseClassList"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CreateCourseClassListResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CreateCourseClassListResult"] = ResolversParentTypes["CreateCourseClassListResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCourseClassListPayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	courseByCode: Resolver<
		ResolversTypes["CourseByCodeResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseByCodeArgs, "code">
	>;
	courseById: Resolver<
		ResolversTypes["CourseByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseByIdArgs, "id">
	>;
	courseClassById: Resolver<
		ResolversTypes["CourseClassByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassByIdArgs, "id">
	>;
	courseClassListByCode: Resolver<
		ResolversTypes["CourseClassListByCodeResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassListByCodeArgs, "code">
	>;
	courseClassListById: Resolver<
		ResolversTypes["CourseClassListByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassListByIdArgs, "id">
	>;
	courseEditionById: Resolver<
		ResolversTypes["CourseEditionByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseEditionByIdArgs, "id">
	>;
	courses: Resolver<Array<ResolversTypes["Course"]>, ParentType, ContextType>;
	faqs: Resolver<Array<ResolversTypes["Faq"]>, ParentType, ContextType>;
	latestCourseClasses: Resolver<Array<ResolversTypes["CourseClass"]>, ParentType, ContextType>;
	userRoles: Resolver<Array<ResolversTypes["UserRole"]>, ParentType, ContextType>;
};

export type CourseByCodeResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseByCodeResult"] = ResolversParentTypes["CourseByCodeResult"]
> = {
	__resolveType: TypeResolveFn<"Course" | "NotFoundError", ParentType, ContextType>;
};

export type CourseByIdResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseByIdResult"] = ResolversParentTypes["CourseByIdResult"]
> = {
	__resolveType: TypeResolveFn<"Course" | "NotFoundError", ParentType, ContextType>;
};

export type CourseClassByIdResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassByIdResult"] = ResolversParentTypes["CourseClassByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClass" | "NotFoundError", ParentType, ContextType>;
};

export type CourseClassListByCodeResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassListByCodeResult"] = ResolversParentTypes["CourseClassListByCodeResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClassList" | "NotFoundError", ParentType, ContextType>;
};

export type CourseClassListByIdResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseClassListByIdResult"] = ResolversParentTypes["CourseClassListByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClassList" | "NotFoundError", ParentType, ContextType>;
};

export type CourseEditionByIdResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CourseEditionByIdResult"] = ResolversParentTypes["CourseEditionByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseEdition" | "NotFoundError", ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	email: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	uid: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	roles: Resolver<Array<ResolversTypes["UserRole"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserRoleResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["UserRole"] = ResolversParentTypes["UserRole"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	code: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type _Resolvers<ContextType = Context> = {
	Void: GraphQLScalarType;
	Mutation: MutationResolvers<ContextType>;
	GenericError: GenericErrorResolvers<ContextType>;
	NotFoundError: NotFoundErrorResolvers<ContextType>;
	AuthenticationError: AuthenticationErrorResolvers<ContextType>;
	Course: CourseResolvers<ContextType>;
	CourseClass: CourseClassResolvers<ContextType>;
	CourseClassChapterCue: CourseClassChapterCueResolvers<ContextType>;
	CourseClassList: CourseClassListResolvers<ContextType>;
	CourseClassVideo: CourseClassVideoResolvers<ContextType>;
	CourseClassVideoFormat: CourseClassVideoFormatResolvers<ContextType>;
	CourseClassVideoQuality: CourseClassVideoQualityResolvers<ContextType>;
	CourseEdition: CourseEditionResolvers<ContextType>;
	Faq: FaqResolvers<ContextType>;
	CreateCoursePayload: CreateCoursePayloadResolvers<ContextType>;
	CreateCourseResult: CreateCourseResultResolvers<ContextType>;
	CreateCourseClassListPayload: CreateCourseClassListPayloadResolvers<ContextType>;
	CreateCourseClassListResult: CreateCourseClassListResultResolvers<ContextType>;
	Query: QueryResolvers<ContextType>;
	CourseByCodeResult: CourseByCodeResultResolvers<ContextType>;
	CourseByIdResult: CourseByIdResultResolvers<ContextType>;
	CourseClassByIdResult: CourseClassByIdResultResolvers<ContextType>;
	CourseClassListByCodeResult: CourseClassListByCodeResultResolvers<ContextType>;
	CourseClassListByIdResult: CourseClassListByIdResultResolvers<ContextType>;
	CourseEditionByIdResult: CourseEditionByIdResultResolvers<ContextType>;
	User: UserResolvers<ContextType>;
	UserRole: UserRoleResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "_Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = _Resolvers<ContextType>;

export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<
	{
		[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
			? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
				? TParent[TResolverKey] extends TResolverValueType
					? TResolvers[TResolverKey] | undefined
					: TResolvers[TResolverKey]
				: TResolvers[TResolverKey]
			: TResolvers[TResolverKey];
	}
>;

export type CustomResolvers = {
	Course: ResolversByParent<_Resolvers["Course"], CourseParent>;
	CourseClass: ResolversByParent<_Resolvers["CourseClass"], CourseClassParent>;
	CourseClassChapterCue: ResolversByParent<_Resolvers["CourseClassChapterCue"], CourseClassChapterCueParent>;
	CourseClassList: ResolversByParent<_Resolvers["CourseClassList"], CourseClassListParent>;
	CourseClassVideo: ResolversByParent<_Resolvers["CourseClassVideo"], CourseClassVideoParent>;
	CourseClassVideoFormat: ResolversByParent<_Resolvers["CourseClassVideoFormat"], CourseClassVideoFormatParent>;
	CourseClassVideoQuality: ResolversByParent<_Resolvers["CourseClassVideoQuality"], CourseClassVideoQualityParent>;
	CourseEdition: ResolversByParent<_Resolvers["CourseEdition"], CourseEditionParent>;
	CreateCourseClassListPayload: ResolversByParent<
		_Resolvers["CreateCourseClassListPayload"],
		CreateCourseClassListPayloadParent
	>;
	CreateCoursePayload: ResolversByParent<_Resolvers["CreateCoursePayload"], CreateCoursePayloadParent>;
	Faq: ResolversByParent<_Resolvers["Faq"], FaqParent>;
	User: ResolversByParent<_Resolvers["User"], UserParent>;
	UserRole: ResolversByParent<_Resolvers["UserRole"], UserRoleParent>;
};

export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;
