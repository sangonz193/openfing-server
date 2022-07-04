/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"

import { OptionalUndefinedKeys } from "../../_utils/OptionalUndefinedKeys"
import { RequestContext } from "../../context/RequestContext"
import { AllowedEmailParent } from "./AllowedEmail/AllowedEmail.parent"
import { AuthenticationErrorParent } from "./AuthenticationError/AuthenticationError.parent"
import { CourseParent } from "./Course/Course.parent"
import { CourseClassParent } from "./CourseClass/CourseClass.parent"
import { CourseClassChapterCueParent } from "./CourseClassChapterCue/CourseClassChapterCue.parent"
import { CourseClassListParent } from "./CourseClassList/CourseClassList.parent"
import { CourseClassLiveStateParent } from "./CourseClassLiveState/CourseClassLiveState.parent"
import { CourseClassVideoParent } from "./CourseClassVideo/CourseClassVideo.parent"
import { CourseClassVideoFormatParent } from "./CourseClassVideoFormat/CourseClassVideoFormat.parent"
import { CourseClassVideoQualityParent } from "./CourseClassVideoQuality/CourseClassVideoQuality.parent"
import { CourseEditionParent } from "./CourseEdition/CourseEdition.parent"
import { FaqParent } from "./Faq/Faq.parent"
import { GenericErrorParent } from "./GenericError/GenericError.parent"
import { GrantParent } from "./Grant/Grant.parent"
import { InvalidEmailDomainParent } from "./InvalidEmailDomain/InvalidEmailDomain.parent"
import { InvalidEmailDomainErrorParent } from "./InvalidEmailDomainError/InvalidEmailDomainError.parent"
import { InvalidFormatErrorParent } from "./InvalidFormatError/InvalidFormatError.parent"
import { MaxLengthErrorParent } from "./MaxLengthError/MaxLengthError.parent"
import { MinLengthErrorParent } from "./MinLengthError/MinLengthError.parent"
import { CreateCoursePayloadParent } from "./Mutation/createCourse/CreateCoursePayload.parent"
import { CreateCourseClassPayloadParent } from "./Mutation/createCourseClass/CreateCourseClassPayload.parent"
import { CreateCourseClassChapterCuePayloadParent } from "./Mutation/createCourseClassChapterCues/CreateCourseClassChapterCuePayload.parent"
import { CreateCourseClassListPayloadParent } from "./Mutation/createCourseClassList/CreateCourseClassListPayload.parent"
import { CreatePostPayloadParent } from "./Mutation/createPost/CreatePostPayload.parent"
import { DeleteCourseClassChapterCuesFromCourseClassPayloadParent } from "./Mutation/deleteCourseClassChapterCuesFromCourseClass/DeleteCourseClassChapterCuesFromCourseClassPayload.parent"
import { DeletePostPayloadParent } from "./Mutation/deletePost/DeletePostPayload.parent"
import { GenerateLegacyJsonFilesPayloadParent } from "./Mutation/generateLegacyJsonFiles/GenerateLegacyJsonFilesPayload.parent"
import { RefreshTokenPayloadParent } from "./Mutation/refreshToken/RefreshTokenPayload.parent"
import { SendVerifyEmailPayloadParent } from "./Mutation/sendVerifyEmail/SendVerifyEmailPayload.parent"
import { SetCourseClassLiveStatePayloadParent } from "./Mutation/setCourseClassLiveState/SetCourseClassLiveStatePayload.parent"
import { EmailNotValidatedErrorParent } from "./Mutation/signIn/EmailNotValidatedError.parent"
import { SignInPayloadParent } from "./Mutation/signIn/SignInPayload.parent"
import { SignInValidationErrorsParent } from "./Mutation/signIn/SignInValidationErrors.parent"
import { SignUpEmailNotSentPayloadParent } from "./Mutation/signUp/SignUpEmailNotSentPayload.parent"
import { SignUpValidationErrorsParent } from "./Mutation/signUp/SignUpValidationErrors.parent"
import { SyncCourseClassVideosForClassPayloadParent } from "./Mutation/syncCourseClassVideosForClass/SyncCourseClassVideosForClassPayload.parent"
import { UpdateCoursePayloadParent } from "./Mutation/updateCourse/UpdateCoursePayload.parent"
import { UpdateCourseClassPayloadParent } from "./Mutation/updateCourseClass/UpdateCourseClassPayload.parent"
import { UpdateCourseClassListPayloadParent } from "./Mutation/updateCourseClassList/UpdateCourseClassListPayload.parent"
import { UpdatePostPayloadParent } from "./Mutation/updatePost/UpdatePostPayload.parent"
import { NotFoundErrorParent } from "./NotFoundError/NotFoundError.parent"
import { PostParent } from "./Post/Post.parent"
import { RequiredFieldErrorParent } from "./RequiredFieldError/RequiredFieldError.parent"
import { UserParent } from "./User/User.parent"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
	[P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	ISODate: Date
	ISODateTime: Date
	Void: any
}

export type AllowedEmail = {
	__typename: "AllowedEmail"
	id: Scalars["ID"]
	emailAddress: Scalars["String"]
}

export type AuthenticationError = {
	__typename: "AuthenticationError"
	_?: Maybe<Scalars["Void"]>
}

export type Course = {
	__typename: "Course"
	id: Scalars["ID"]
	code: Scalars["String"]
	name: Scalars["String"]
	iconUrl?: Maybe<Scalars["String"]>
	eva?: Maybe<Scalars["String"]>
	visibility?: Maybe<CourseVisibility>
	editions: CourseEdition[]
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseByCodeResult = Course | NotFoundError

export type CourseByIdResult = Course | NotFoundError

export type CourseClass = {
	__typename: "CourseClass"
	id: Scalars["ID"]
	number?: Maybe<Scalars["Int"]>
	name?: Maybe<Scalars["String"]>
	liveState?: Maybe<CourseClassLiveState>
	videos: CourseClassVideo[]
	chapterCues: CourseClassChapterCue[]
	courseClassList?: Maybe<CourseClassList>
	visibility?: Maybe<CourseClassVisibility>
	publishedAt?: Maybe<Scalars["ISODateTime"]>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassByIdResult = CourseClass | NotFoundError

export type CourseClassChapterCue = {
	__typename: "CourseClassChapterCue"
	id: Scalars["ID"]
	name: Scalars["String"]
	startSeconds: Scalars["Float"]
	endSeconds: Scalars["Float"]
	courseClass?: Maybe<CourseClass>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassList = {
	__typename: "CourseClassList"
	id: Scalars["ID"]
	code: Scalars["String"]
	name?: Maybe<Scalars["String"]>
	classes?: Maybe<CourseClass[]>
	courseEdition?: Maybe<CourseEdition>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseClassListByCodeResult = CourseClassList | NotFoundError

export type CourseClassListByIdResult = CourseClassList | NotFoundError

export type CourseClassListRef = {
	byId?: Maybe<CourseClassListRefById>
	byCode?: Maybe<CourseClassListRefByCode>
}

export type CourseClassListRefByCode = {
	code: Scalars["String"]
}

export type CourseClassListRefById = {
	id: Scalars["ID"]
}

export type CourseClassLiveState = {
	__typename: "CourseClassLiveState"
	id: Scalars["ID"]
	html?: Maybe<Scalars["String"]>
	inProgress?: Maybe<Scalars["Boolean"]>
	startDate?: Maybe<Scalars["ISODateTime"]>
	courseClass?: Maybe<CourseClass>
}

export type CourseClassRef = {
	byId?: Maybe<CourseClassRefById>
	byNumber?: Maybe<CourseClassRefByNumber>
}

export type CourseClassRefById = {
	id: Scalars["ID"]
}

export type CourseClassRefByNumber = {
	courseClassList: CourseClassListRef
	number: Scalars["Int"]
}

export type CourseClassVideo = {
	__typename: "CourseClassVideo"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	qualities: CourseClassVideoQuality[]
	courseClass?: Maybe<CourseClass>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVideoFormat = {
	__typename: "CourseClassVideoFormat"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	url?: Maybe<Scalars["String"]>
	hasTorrent?: Maybe<Scalars["Boolean"]>
	quality?: Maybe<CourseClassVideoQuality>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVideoQuality = {
	__typename: "CourseClassVideoQuality"
	id: Scalars["ID"]
	height?: Maybe<Scalars["Int"]>
	width?: Maybe<Scalars["Int"]>
	video?: Maybe<CourseClassVideo>
	formats: CourseClassVideoFormat[]
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CourseEdition = {
	__typename: "CourseEdition"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	semester?: Maybe<Scalars["Int"]>
	year?: Maybe<Scalars["Int"]>
	courseClassLists: CourseClassList[]
	course?: Maybe<Course>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseEditionByIdResult = CourseEdition | NotFoundError

export type CourseRef = {
	byId?: Maybe<CourseRefById>
	byCode?: Maybe<CourseRefByCode>
}

export type CourseRefByCode = {
	code: Scalars["String"]
}

export type CourseRefById = {
	id: Scalars["ID"]
}

export type CourseVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassChapterCueDataInput = {
	name: Scalars["String"]
	startSeconds: Scalars["Float"]
	endSeconds: Scalars["Float"]
}

export type CreateCourseClassChapterCueInput = {
	courseClassRef: CourseClassRef
	data: CreateCourseClassChapterCueDataInput
}

export type CreateCourseClassChapterCuePayload = {
	__typename: "CreateCourseClassChapterCuePayload"
	courseClassChapterCue: CourseClassChapterCue
}

export type CreateCourseClassChapterCueResult =
	| CreateCourseClassChapterCuePayload
	| AuthenticationError
	| GenericError
	| NotFoundError

export type CreateCourseClassInput = {
	courseClassListRef: CourseClassListRef
	name: Scalars["String"]
	number: Scalars["Int"]
	visibility?: Maybe<CreateCourseClassInputVisibility>
}

export type CreateCourseClassInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassListInput = {
	courseCode: Scalars["String"]
	code: Scalars["String"]
	name: Scalars["String"]
	semester: Scalars["Int"]
	year: Scalars["Int"]
	visibility?: Maybe<CreateCourseClassListInputVisibility>
}

export type CreateCourseClassListInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassListPayload = {
	__typename: "CreateCourseClassListPayload"
	courseClassList: CourseClassList
}

export type CreateCourseClassListResult = CreateCourseClassListPayload | GenericError | AuthenticationError

export type CreateCourseClassPayload = {
	__typename: "CreateCourseClassPayload"
	courseClass: CourseClass
}

export type CreateCourseClassResult = CreateCourseClassPayload | GenericError | AuthenticationError

export type CreateCourseInput = {
	code: Scalars["String"]
	name: Scalars["String"]
	eva?: Maybe<Scalars["String"]>
	visibility?: Maybe<CreateCourseInputVisibility>
}

export type CreateCourseInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCoursePayload = {
	__typename: "CreateCoursePayload"
	course: Course
}

export type CreateCourseResult = CreateCoursePayload | GenericError | AuthenticationError

export type CreatePostInput = {
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
}

export type CreatePostPayload = {
	__typename: "CreatePostPayload"
	post: Post
}

export type CreatePostResult = CreatePostPayload | GenericError | AuthenticationError

export type DeleteCourseClassChapterCuesFromCourseClassInput = {
	courseClassRef: CourseClassRef
}

export type DeleteCourseClassChapterCuesFromCourseClassPayload = {
	__typename: "DeleteCourseClassChapterCuesFromCourseClassPayload"
	courseClass: CourseClass
}

export type DeleteCourseClassChapterCuesFromCourseClassResult =
	| DeleteCourseClassChapterCuesFromCourseClassPayload
	| GenericError
	| NotFoundError
	| AuthenticationError

export type DeletePostPayload = {
	__typename: "DeletePostPayload"
	deleted: Scalars["Boolean"]
}

export type DeletePostResult = DeletePostPayload | GenericError | AuthenticationError | NotFoundError

export type EmailNotValidatedError = {
	__typename: "EmailNotValidatedError"
	_?: Maybe<Scalars["Void"]>
}

export type Faq = {
	__typename: "Faq"
	id: Scalars["ID"]
	title: Scalars["String"]
	content: Scalars["String"]
	isHtml?: Maybe<Scalars["Boolean"]>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	deletedBy?: Maybe<User>
}

export type GenerateLegacyJsonFilesPayload = {
	__typename: "GenerateLegacyJsonFilesPayload"
	modifiedFilesCount?: Maybe<Scalars["Int"]>
}

export type GenerateLegacyJsonFilesResult = GenericError | GenerateLegacyJsonFilesPayload

export type GenericError = {
	__typename: "GenericError"
	_?: Maybe<Scalars["Void"]>
}

export type Grant = {
	__typename: "Grant"
	token: Scalars["String"]
	refreshToken: Scalars["String"]
}

export type InvalidEmailDomain = {
	__typename: "InvalidEmailDomain"
	_?: Maybe<Scalars["Void"]>
}

export type InvalidEmailDomainError = {
	__typename: "InvalidEmailDomainError"
	_?: Maybe<Scalars["Void"]>
}

export type InvalidFormatError = {
	__typename: "InvalidFormatError"
	_?: Maybe<Scalars["Void"]>
}

export type MaxLengthError = {
	__typename: "MaxLengthError"
	max: Scalars["Int"]
}

export type MinLengthError = {
	__typename: "MinLengthError"
	min: Scalars["Int"]
}

export type Mutation = {
	__typename: "Mutation"
	_?: Maybe<Scalars["Void"]>
	backup?: Maybe<Scalars["Void"]>
	backupDb?: Maybe<Scalars["Void"]>
	createCourse: CreateCourseResult
	createCourse_v2: CreateCourseResult
	createCourseClass: CreateCourseClassResult
	createCourseClass_v2: CreateCourseClassResult
	createCourseClassChapterCue: CreateCourseClassChapterCueResult
	createCourseClassList: CreateCourseClassListResult
	createCourseClassList_v2: CreateCourseClassListResult
	createPost: CreatePostResult
	deleteCourseClassChapterCuesFromCourseClass: DeleteCourseClassChapterCuesFromCourseClassResult
	deletePost: DeletePostResult
	generateLegacyJsonFiles: GenerateLegacyJsonFilesResult
	refreshToken: RefreshTokenResult
	restoreDb?: Maybe<Scalars["Void"]>
	restoreDb_v2?: Maybe<Scalars["Void"]>
	sendVerifyEmail: SendVerifyEmailResult
	setCourseClassLiveState: SetCourseClassLiveStateResult
	setCourseClassLiveState_v2: SetCourseClassLiveStateResult
	signIn: SignInResult
	signUp?: Maybe<SignUpResult>
	syncCourseClassVideosForClass?: Maybe<SyncCourseClassVideosForClassResult>
	updateCourse: UpdateCourseResult
	updateCourseClass: UpdateCourseClassResult
	updateCourseClass_v2: UpdateCourseClassResult
	updateCourseClassList: UpdateCourseClassListResult
	updateCourseClassList_v2: UpdateCourseClassListResult
	updatePost: UpdatePostResult
}

export type MutationBackupDbArgs = {
	secret: Scalars["String"]
}

export type MutationCreateCourseArgs = {
	input: CreateCourseInput
	secret: Scalars["String"]
}

export type MutationCreateCourse_V2Args = {
	input: CreateCourseInput
}

export type MutationCreateCourseClassArgs = {
	input: CreateCourseClassInput
	secret: Scalars["String"]
}

export type MutationCreateCourseClass_V2Args = {
	input: CreateCourseClassInput
}

export type MutationCreateCourseClassChapterCueArgs = {
	input: CreateCourseClassChapterCueInput
}

export type MutationCreateCourseClassListArgs = {
	input: CreateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationCreateCourseClassList_V2Args = {
	input: CreateCourseClassListInput
}

export type MutationCreatePostArgs = {
	input: CreatePostInput
}

export type MutationDeleteCourseClassChapterCuesFromCourseClassArgs = {
	input: DeleteCourseClassChapterCuesFromCourseClassInput
}

export type MutationDeletePostArgs = {
	id: Scalars["ID"]
}

export type MutationGenerateLegacyJsonFilesArgs = {
	secret: Scalars["String"]
}

export type MutationRefreshTokenArgs = {
	input: RefreshTokenInput
}

export type MutationRestoreDbArgs = {
	secret: Scalars["String"]
}

export type MutationSendVerifyEmailArgs = {
	input: SendVerifyEmailInput
}

export type MutationSetCourseClassLiveStateArgs = {
	input: SetCourseClassLiveStateInput
	secret: Scalars["String"]
}

export type MutationSetCourseClassLiveState_V2Args = {
	input: SetCourseClassLiveStateInput
}

export type MutationSignInArgs = {
	input: SignInInput
}

export type MutationSignUpArgs = {
	input: SignUpInput
}

export type MutationSyncCourseClassVideosForClassArgs = {
	courseClassRef: CourseClassRef
}

export type MutationUpdateCourseArgs = {
	ref: CourseRef
	input: UpdateCourseInput
}

export type MutationUpdateCourseClassArgs = {
	ref: CourseClassRef
	input: UpdateCourseClassInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClass_V2Args = {
	ref: CourseClassRef
	input: UpdateCourseClassInput
}

export type MutationUpdateCourseClassListArgs = {
	ref: CourseClassListRef
	input: UpdateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClassList_V2Args = {
	ref: CourseClassListRef
	input: UpdateCourseClassListInput
}

export type MutationUpdatePostArgs = {
	id: Scalars["ID"]
	input: UpdatePostInput
}

export type NotFoundError = {
	__typename: "NotFoundError"
	_?: Maybe<Scalars["Void"]>
}

export type Post = {
	__typename: "Post"
	id: Scalars["ID"]
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	deletedBy?: Maybe<User>
}

export type Query = {
	__typename: "Query"
	_?: Maybe<Scalars["Void"]>
	courseByCode: CourseByCodeResult
	courseById: CourseByIdResult
	courseClassById: CourseClassByIdResult
	courseClassListByCode: CourseClassListByCodeResult
	courseClassListById: CourseClassListByIdResult
	courseEditionById: CourseEditionByIdResult
	courses: Course[]
	faqs: Faq[]
	latestCourseClasses: CourseClass[]
	posts: Post[]
}

export type QueryCourseByCodeArgs = {
	code: Scalars["String"]
}

export type QueryCourseByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseClassByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseClassListByCodeArgs = {
	code: Scalars["String"]
}

export type QueryCourseClassListByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseEditionByIdArgs = {
	id: Scalars["ID"]
}

export type RefreshTokenInput = {
	refreshToken: Scalars["String"]
}

export type RefreshTokenPayload = {
	__typename: "RefreshTokenPayload"
	grant: Grant
}

export type RefreshTokenResult = RefreshTokenPayload | GenericError | AuthenticationError

export type RequiredFieldError = {
	__typename: "RequiredFieldError"
	_?: Maybe<Scalars["Void"]>
}

export type SendVerifyEmailInput = {
	email: Scalars["String"]
}

export type SendVerifyEmailPayload = {
	__typename: "SendVerifyEmailPayload"
	_?: Maybe<Scalars["Void"]>
}

export type SendVerifyEmailResult = SendVerifyEmailPayload | GenericError

export type SetCourseClassLiveStateDataInput = {
	inProgress?: Maybe<Scalars["Boolean"]>
	html?: Maybe<Scalars["String"]>
	startDate?: Maybe<Scalars["ISODateTime"]>
}

export type SetCourseClassLiveStateInput = {
	courseClassRef: CourseClassRef
	data?: Maybe<SetCourseClassLiveStateDataInput>
}

export type SetCourseClassLiveStatePayload = {
	__typename: "SetCourseClassLiveStatePayload"
	courseClassLiveState?: Maybe<CourseClassLiveState>
}

export type SetCourseClassLiveStateResult = SetCourseClassLiveStatePayload | GenericError | AuthenticationError

export type SignInEmailError = RequiredFieldError | InvalidFormatError

export type SignInInput = {
	email: Scalars["String"]
	password: Scalars["String"]
}

export type SignInPasswordError = RequiredFieldError

export type SignInPayload = {
	__typename: "SignInPayload"
	grant: Grant
}

export type SignInResult =
	| SignInPayload
	| GenericError
	| AuthenticationError
	| SignInValidationErrors
	| EmailNotValidatedError

export type SignInValidationErrors = {
	__typename: "SignInValidationErrors"
	email?: Maybe<SignInEmailError[]>
	password?: Maybe<SignInPasswordError[]>
}

export type SignUpEmailError = RequiredFieldError | InvalidEmailDomainError | InvalidFormatError | MaxLengthError

export type SignUpEmailNotSentPayload = {
	__typename: "SignUpEmailNotSentPayload"
	issueId: Scalars["String"]
}

export type SignUpFirstNameError = RequiredFieldError | MinLengthError | MaxLengthError

export type SignUpInput = {
	firstName: Scalars["String"]
	lastName?: Maybe<Scalars["String"]>
	email: Scalars["String"]
	password: Scalars["String"]
}

export type SignUpLastNameError = MaxLengthError

export type SignUpPasswordError = RequiredFieldError | MinLengthError | MaxLengthError

export type SignUpResult = GenericError | AuthenticationError | SignUpValidationErrors | SignUpEmailNotSentPayload

export type SignUpValidationErrors = {
	__typename: "SignUpValidationErrors"
	email?: Maybe<SignUpEmailError[]>
	firstName?: Maybe<SignUpFirstNameError[]>
	lastName?: Maybe<SignUpLastNameError[]>
	password?: Maybe<SignUpPasswordError[]>
}

export type SyncCourseClassVideosForClassPayload = {
	__typename: "SyncCourseClassVideosForClassPayload"
	courseClass: CourseClass
}

export type SyncCourseClassVideosForClassResult =
	| SyncCourseClassVideosForClassPayload
	| NotFoundError
	| AuthenticationError
	| GenericError

export type UpdateCourseClassInput = {
	name?: Maybe<Scalars["String"]>
	number?: Maybe<Scalars["Int"]>
	publishedAt?: Maybe<Scalars["ISODateTime"]>
	visibility?: Maybe<UpdateCourseClassInputVisibility>
}

export type UpdateCourseClassInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type UpdateCourseClassListInput = {
	name?: Maybe<Scalars["String"]>
	visibility?: Maybe<UpdateCourseClassListInputVisibility>
}

export type UpdateCourseClassListInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type UpdateCourseClassListPayload = {
	__typename: "UpdateCourseClassListPayload"
	courseClassList: CourseClassList
}

export type UpdateCourseClassListResult =
	| UpdateCourseClassListPayload
	| GenericError
	| AuthenticationError
	| NotFoundError

export type UpdateCourseClassPayload = {
	__typename: "UpdateCourseClassPayload"
	courseClass: CourseClass
}

export type UpdateCourseClassResult = UpdateCourseClassPayload | GenericError | AuthenticationError | NotFoundError

export type UpdateCourseInput = {
	name?: Maybe<Scalars["String"]>
	visibility?: Maybe<CourseVisibility>
	code?: Maybe<Scalars["String"]>
	eva?: Maybe<Scalars["String"]>
}

export type UpdateCoursePayload = {
	__typename: "UpdateCoursePayload"
	course: Course
}

export type UpdateCourseResult = UpdateCoursePayload | GenericError | AuthenticationError | NotFoundError

export type UpdatePostInput = {
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
}

export type UpdatePostPayload = {
	__typename: "UpdatePostPayload"
	post: Post
}

export type UpdatePostResult = UpdatePostPayload | GenericError | AuthenticationError | NotFoundError

export type User = {
	__typename: "User"
	id: Scalars["ID"]
	name: Scalars["String"]
	givenName: Scalars["String"]
	familyName?: Maybe<Scalars["String"]>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
	selectionSet: string
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
	| LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
	| NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	AllowedEmail: ResolverTypeWrapper<AllowedEmailParent>
	ID: ResolverTypeWrapper<Scalars["ID"]>
	String: ResolverTypeWrapper<Scalars["String"]>
	AuthenticationError: ResolverTypeWrapper<AuthenticationErrorParent>
	Course: ResolverTypeWrapper<CourseParent>
	CourseByCodeResult: ResolversTypes["Course"] | ResolversTypes["NotFoundError"]
	CourseByIdResult: ResolversTypes["Course"] | ResolversTypes["NotFoundError"]
	CourseClass: ResolverTypeWrapper<CourseClassParent>
	Int: ResolverTypeWrapper<Scalars["Int"]>
	CourseClassByIdResult: ResolversTypes["CourseClass"] | ResolversTypes["NotFoundError"]
	CourseClassChapterCue: ResolverTypeWrapper<CourseClassChapterCueParent>
	Float: ResolverTypeWrapper<Scalars["Float"]>
	CourseClassList: ResolverTypeWrapper<CourseClassListParent>
	CourseClassListByCodeResult: ResolversTypes["CourseClassList"] | ResolversTypes["NotFoundError"]
	CourseClassListByIdResult: ResolversTypes["CourseClassList"] | ResolversTypes["NotFoundError"]
	CourseClassListRef: CourseClassListRef
	CourseClassListRefByCode: CourseClassListRefByCode
	CourseClassListRefById: CourseClassListRefById
	CourseClassLiveState: ResolverTypeWrapper<CourseClassLiveStateParent>
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
	CourseClassRef: CourseClassRef
	CourseClassRefById: CourseClassRefById
	CourseClassRefByNumber: CourseClassRefByNumber
	CourseClassVideo: ResolverTypeWrapper<CourseClassVideoParent>
	CourseClassVideoFormat: ResolverTypeWrapper<CourseClassVideoFormatParent>
	CourseClassVideoQuality: ResolverTypeWrapper<CourseClassVideoQualityParent>
	CourseClassVisibility: CourseClassVisibility
	CourseEdition: ResolverTypeWrapper<CourseEditionParent>
	CourseEditionByIdResult: ResolversTypes["CourseEdition"] | ResolversTypes["NotFoundError"]
	CourseRef: CourseRef
	CourseRefByCode: CourseRefByCode
	CourseRefById: CourseRefById
	CourseVisibility: CourseVisibility
	CreateCourseClassChapterCueDataInput: CreateCourseClassChapterCueDataInput
	CreateCourseClassChapterCueInput: CreateCourseClassChapterCueInput
	CreateCourseClassChapterCuePayload: ResolverTypeWrapper<CreateCourseClassChapterCuePayloadParent>
	CreateCourseClassChapterCueResult:
		| ResolversTypes["CreateCourseClassChapterCuePayload"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["NotFoundError"]
	CreateCourseClassInput: CreateCourseClassInput
	CreateCourseClassInputVisibility: CreateCourseClassInputVisibility
	CreateCourseClassListInput: CreateCourseClassListInput
	CreateCourseClassListInputVisibility: CreateCourseClassListInputVisibility
	CreateCourseClassListPayload: ResolverTypeWrapper<CreateCourseClassListPayloadParent>
	CreateCourseClassListResult:
		| ResolversTypes["CreateCourseClassListPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	CreateCourseClassPayload: ResolverTypeWrapper<CreateCourseClassPayloadParent>
	CreateCourseClassResult:
		| ResolversTypes["CreateCourseClassPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	CreateCourseInput: CreateCourseInput
	CreateCourseInputVisibility: CreateCourseInputVisibility
	CreateCoursePayload: ResolverTypeWrapper<CreateCoursePayloadParent>
	CreateCourseResult:
		| ResolversTypes["CreateCoursePayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	CreatePostInput: CreatePostInput
	CreatePostPayload: ResolverTypeWrapper<CreatePostPayloadParent>
	CreatePostResult:
		| ResolversTypes["CreatePostPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	DeleteCourseClassChapterCuesFromCourseClassInput: DeleteCourseClassChapterCuesFromCourseClassInput
	DeleteCourseClassChapterCuesFromCourseClassPayload: ResolverTypeWrapper<DeleteCourseClassChapterCuesFromCourseClassPayloadParent>
	DeleteCourseClassChapterCuesFromCourseClassResult:
		| ResolversTypes["DeleteCourseClassChapterCuesFromCourseClassPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["NotFoundError"]
		| ResolversTypes["AuthenticationError"]
	DeletePostPayload: ResolverTypeWrapper<DeletePostPayloadParent>
	DeletePostResult:
		| ResolversTypes["DeletePostPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["NotFoundError"]
	EmailNotValidatedError: ResolverTypeWrapper<EmailNotValidatedErrorParent>
	Faq: ResolverTypeWrapper<FaqParent>
	GenerateLegacyJsonFilesPayload: ResolverTypeWrapper<GenerateLegacyJsonFilesPayloadParent>
	GenerateLegacyJsonFilesResult: ResolversTypes["GenericError"] | ResolversTypes["GenerateLegacyJsonFilesPayload"]
	GenericError: ResolverTypeWrapper<GenericErrorParent>
	Grant: ResolverTypeWrapper<GrantParent>
	ISODate: ResolverTypeWrapper<Scalars["ISODate"]>
	ISODateTime: ResolverTypeWrapper<Scalars["ISODateTime"]>
	InvalidEmailDomain: ResolverTypeWrapper<InvalidEmailDomainParent>
	InvalidEmailDomainError: ResolverTypeWrapper<InvalidEmailDomainErrorParent>
	InvalidFormatError: ResolverTypeWrapper<InvalidFormatErrorParent>
	MaxLengthError: ResolverTypeWrapper<MaxLengthErrorParent>
	MinLengthError: ResolverTypeWrapper<MinLengthErrorParent>
	Mutation: ResolverTypeWrapper<{}>
	NotFoundError: ResolverTypeWrapper<NotFoundErrorParent>
	Post: ResolverTypeWrapper<PostParent>
	Query: ResolverTypeWrapper<{}>
	RefreshTokenInput: RefreshTokenInput
	RefreshTokenPayload: ResolverTypeWrapper<RefreshTokenPayloadParent>
	RefreshTokenResult:
		| ResolversTypes["RefreshTokenPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	RequiredFieldError: ResolverTypeWrapper<RequiredFieldErrorParent>
	SendVerifyEmailInput: SendVerifyEmailInput
	SendVerifyEmailPayload: ResolverTypeWrapper<SendVerifyEmailPayloadParent>
	SendVerifyEmailResult: ResolversTypes["SendVerifyEmailPayload"] | ResolversTypes["GenericError"]
	SetCourseClassLiveStateDataInput: SetCourseClassLiveStateDataInput
	SetCourseClassLiveStateInput: SetCourseClassLiveStateInput
	SetCourseClassLiveStatePayload: ResolverTypeWrapper<SetCourseClassLiveStatePayloadParent>
	SetCourseClassLiveStateResult:
		| ResolversTypes["SetCourseClassLiveStatePayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
	SignInEmailError: ResolversTypes["RequiredFieldError"] | ResolversTypes["InvalidFormatError"]
	SignInInput: SignInInput
	SignInPasswordError: ResolversTypes["RequiredFieldError"]
	SignInPayload: ResolverTypeWrapper<SignInPayloadParent>
	SignInResult:
		| ResolversTypes["SignInPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["SignInValidationErrors"]
		| ResolversTypes["EmailNotValidatedError"]
	SignInValidationErrors: ResolverTypeWrapper<SignInValidationErrorsParent>
	SignUpEmailError:
		| ResolversTypes["RequiredFieldError"]
		| ResolversTypes["InvalidEmailDomainError"]
		| ResolversTypes["InvalidFormatError"]
		| ResolversTypes["MaxLengthError"]
	SignUpEmailNotSentPayload: ResolverTypeWrapper<SignUpEmailNotSentPayloadParent>
	SignUpFirstNameError:
		| ResolversTypes["RequiredFieldError"]
		| ResolversTypes["MinLengthError"]
		| ResolversTypes["MaxLengthError"]
	SignUpInput: SignUpInput
	SignUpLastNameError: ResolversTypes["MaxLengthError"]
	SignUpPasswordError:
		| ResolversTypes["RequiredFieldError"]
		| ResolversTypes["MinLengthError"]
		| ResolversTypes["MaxLengthError"]
	SignUpResult:
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["SignUpValidationErrors"]
		| ResolversTypes["SignUpEmailNotSentPayload"]
	SignUpValidationErrors: ResolverTypeWrapper<SignUpValidationErrorsParent>
	SyncCourseClassVideosForClassPayload: ResolverTypeWrapper<SyncCourseClassVideosForClassPayloadParent>
	SyncCourseClassVideosForClassResult:
		| ResolversTypes["SyncCourseClassVideosForClassPayload"]
		| ResolversTypes["NotFoundError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["GenericError"]
	UpdateCourseClassInput: UpdateCourseClassInput
	UpdateCourseClassInputVisibility: UpdateCourseClassInputVisibility
	UpdateCourseClassListInput: UpdateCourseClassListInput
	UpdateCourseClassListInputVisibility: UpdateCourseClassListInputVisibility
	UpdateCourseClassListPayload: ResolverTypeWrapper<UpdateCourseClassListPayloadParent>
	UpdateCourseClassListResult:
		| ResolversTypes["UpdateCourseClassListPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["NotFoundError"]
	UpdateCourseClassPayload: ResolverTypeWrapper<UpdateCourseClassPayloadParent>
	UpdateCourseClassResult:
		| ResolversTypes["UpdateCourseClassPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["NotFoundError"]
	UpdateCourseInput: UpdateCourseInput
	UpdateCoursePayload: ResolverTypeWrapper<UpdateCoursePayloadParent>
	UpdateCourseResult:
		| ResolversTypes["UpdateCoursePayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["NotFoundError"]
	UpdatePostInput: UpdatePostInput
	UpdatePostPayload: ResolverTypeWrapper<UpdatePostPayloadParent>
	UpdatePostResult:
		| ResolversTypes["UpdatePostPayload"]
		| ResolversTypes["GenericError"]
		| ResolversTypes["AuthenticationError"]
		| ResolversTypes["NotFoundError"]
	User: ResolverTypeWrapper<UserParent>
	Void: ResolverTypeWrapper<Scalars["Void"]>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	AllowedEmail: AllowedEmailParent
	ID: Scalars["ID"]
	String: Scalars["String"]
	AuthenticationError: AuthenticationErrorParent
	Course: CourseParent
	CourseByCodeResult: ResolversParentTypes["Course"] | ResolversParentTypes["NotFoundError"]
	CourseByIdResult: ResolversParentTypes["Course"] | ResolversParentTypes["NotFoundError"]
	CourseClass: CourseClassParent
	Int: Scalars["Int"]
	CourseClassByIdResult: ResolversParentTypes["CourseClass"] | ResolversParentTypes["NotFoundError"]
	CourseClassChapterCue: CourseClassChapterCueParent
	Float: Scalars["Float"]
	CourseClassList: CourseClassListParent
	CourseClassListByCodeResult: ResolversParentTypes["CourseClassList"] | ResolversParentTypes["NotFoundError"]
	CourseClassListByIdResult: ResolversParentTypes["CourseClassList"] | ResolversParentTypes["NotFoundError"]
	CourseClassListRef: CourseClassListRef
	CourseClassListRefByCode: CourseClassListRefByCode
	CourseClassListRefById: CourseClassListRefById
	CourseClassLiveState: CourseClassLiveStateParent
	Boolean: Scalars["Boolean"]
	CourseClassRef: CourseClassRef
	CourseClassRefById: CourseClassRefById
	CourseClassRefByNumber: CourseClassRefByNumber
	CourseClassVideo: CourseClassVideoParent
	CourseClassVideoFormat: CourseClassVideoFormatParent
	CourseClassVideoQuality: CourseClassVideoQualityParent
	CourseEdition: CourseEditionParent
	CourseEditionByIdResult: ResolversParentTypes["CourseEdition"] | ResolversParentTypes["NotFoundError"]
	CourseRef: CourseRef
	CourseRefByCode: CourseRefByCode
	CourseRefById: CourseRefById
	CreateCourseClassChapterCueDataInput: CreateCourseClassChapterCueDataInput
	CreateCourseClassChapterCueInput: CreateCourseClassChapterCueInput
	CreateCourseClassChapterCuePayload: CreateCourseClassChapterCuePayloadParent
	CreateCourseClassChapterCueResult:
		| ResolversParentTypes["CreateCourseClassChapterCuePayload"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["NotFoundError"]
	CreateCourseClassInput: CreateCourseClassInput
	CreateCourseClassListInput: CreateCourseClassListInput
	CreateCourseClassListPayload: CreateCourseClassListPayloadParent
	CreateCourseClassListResult:
		| ResolversParentTypes["CreateCourseClassListPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	CreateCourseClassPayload: CreateCourseClassPayloadParent
	CreateCourseClassResult:
		| ResolversParentTypes["CreateCourseClassPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	CreateCourseInput: CreateCourseInput
	CreateCoursePayload: CreateCoursePayloadParent
	CreateCourseResult:
		| ResolversParentTypes["CreateCoursePayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	CreatePostInput: CreatePostInput
	CreatePostPayload: CreatePostPayloadParent
	CreatePostResult:
		| ResolversParentTypes["CreatePostPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	DeleteCourseClassChapterCuesFromCourseClassInput: DeleteCourseClassChapterCuesFromCourseClassInput
	DeleteCourseClassChapterCuesFromCourseClassPayload: DeleteCourseClassChapterCuesFromCourseClassPayloadParent
	DeleteCourseClassChapterCuesFromCourseClassResult:
		| ResolversParentTypes["DeleteCourseClassChapterCuesFromCourseClassPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["NotFoundError"]
		| ResolversParentTypes["AuthenticationError"]
	DeletePostPayload: DeletePostPayloadParent
	DeletePostResult:
		| ResolversParentTypes["DeletePostPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["NotFoundError"]
	EmailNotValidatedError: EmailNotValidatedErrorParent
	Faq: FaqParent
	GenerateLegacyJsonFilesPayload: GenerateLegacyJsonFilesPayloadParent
	GenerateLegacyJsonFilesResult:
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["GenerateLegacyJsonFilesPayload"]
	GenericError: GenericErrorParent
	Grant: GrantParent
	ISODate: Scalars["ISODate"]
	ISODateTime: Scalars["ISODateTime"]
	InvalidEmailDomain: InvalidEmailDomainParent
	InvalidEmailDomainError: InvalidEmailDomainErrorParent
	InvalidFormatError: InvalidFormatErrorParent
	MaxLengthError: MaxLengthErrorParent
	MinLengthError: MinLengthErrorParent
	Mutation: {}
	NotFoundError: NotFoundErrorParent
	Post: PostParent
	Query: {}
	RefreshTokenInput: RefreshTokenInput
	RefreshTokenPayload: RefreshTokenPayloadParent
	RefreshTokenResult:
		| ResolversParentTypes["RefreshTokenPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	RequiredFieldError: RequiredFieldErrorParent
	SendVerifyEmailInput: SendVerifyEmailInput
	SendVerifyEmailPayload: SendVerifyEmailPayloadParent
	SendVerifyEmailResult: ResolversParentTypes["SendVerifyEmailPayload"] | ResolversParentTypes["GenericError"]
	SetCourseClassLiveStateDataInput: SetCourseClassLiveStateDataInput
	SetCourseClassLiveStateInput: SetCourseClassLiveStateInput
	SetCourseClassLiveStatePayload: SetCourseClassLiveStatePayloadParent
	SetCourseClassLiveStateResult:
		| ResolversParentTypes["SetCourseClassLiveStatePayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
	SignInEmailError: ResolversParentTypes["RequiredFieldError"] | ResolversParentTypes["InvalidFormatError"]
	SignInInput: SignInInput
	SignInPasswordError: ResolversParentTypes["RequiredFieldError"]
	SignInPayload: SignInPayloadParent
	SignInResult:
		| ResolversParentTypes["SignInPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["SignInValidationErrors"]
		| ResolversParentTypes["EmailNotValidatedError"]
	SignInValidationErrors: SignInValidationErrorsParent
	SignUpEmailError:
		| ResolversParentTypes["RequiredFieldError"]
		| ResolversParentTypes["InvalidEmailDomainError"]
		| ResolversParentTypes["InvalidFormatError"]
		| ResolversParentTypes["MaxLengthError"]
	SignUpEmailNotSentPayload: SignUpEmailNotSentPayloadParent
	SignUpFirstNameError:
		| ResolversParentTypes["RequiredFieldError"]
		| ResolversParentTypes["MinLengthError"]
		| ResolversParentTypes["MaxLengthError"]
	SignUpInput: SignUpInput
	SignUpLastNameError: ResolversParentTypes["MaxLengthError"]
	SignUpPasswordError:
		| ResolversParentTypes["RequiredFieldError"]
		| ResolversParentTypes["MinLengthError"]
		| ResolversParentTypes["MaxLengthError"]
	SignUpResult:
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["SignUpValidationErrors"]
		| ResolversParentTypes["SignUpEmailNotSentPayload"]
	SignUpValidationErrors: SignUpValidationErrorsParent
	SyncCourseClassVideosForClassPayload: SyncCourseClassVideosForClassPayloadParent
	SyncCourseClassVideosForClassResult:
		| ResolversParentTypes["SyncCourseClassVideosForClassPayload"]
		| ResolversParentTypes["NotFoundError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["GenericError"]
	UpdateCourseClassInput: UpdateCourseClassInput
	UpdateCourseClassListInput: UpdateCourseClassListInput
	UpdateCourseClassListPayload: UpdateCourseClassListPayloadParent
	UpdateCourseClassListResult:
		| ResolversParentTypes["UpdateCourseClassListPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["NotFoundError"]
	UpdateCourseClassPayload: UpdateCourseClassPayloadParent
	UpdateCourseClassResult:
		| ResolversParentTypes["UpdateCourseClassPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["NotFoundError"]
	UpdateCourseInput: UpdateCourseInput
	UpdateCoursePayload: UpdateCoursePayloadParent
	UpdateCourseResult:
		| ResolversParentTypes["UpdateCoursePayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["NotFoundError"]
	UpdatePostInput: UpdatePostInput
	UpdatePostPayload: UpdatePostPayloadParent
	UpdatePostResult:
		| ResolversParentTypes["UpdatePostPayload"]
		| ResolversParentTypes["GenericError"]
		| ResolversParentTypes["AuthenticationError"]
		| ResolversParentTypes["NotFoundError"]
	User: UserParent
	Void: Scalars["Void"]
}

export type AllowedEmailResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["AllowedEmail"] = ResolversParentTypes["AllowedEmail"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	emailAddress: Resolver<ResolversTypes["String"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AuthenticationErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["AuthenticationError"] = ResolversParentTypes["AuthenticationError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Course"] = ResolversParentTypes["Course"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	code: Resolver<ResolversTypes["String"], ParentType, ContextType>
	name: Resolver<ResolversTypes["String"], ParentType, ContextType>
	iconUrl: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	eva: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	visibility: Resolver<Maybe<ResolversTypes["CourseVisibility"]>, ParentType, ContextType>
	editions: Resolver<Array<ResolversTypes["CourseEdition"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseByCodeResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseByCodeResult"] = ResolversParentTypes["CourseByCodeResult"]
> = {
	__resolveType: TypeResolveFn<"Course" | "NotFoundError", ParentType, ContextType>
}

export type CourseByIdResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseByIdResult"] = ResolversParentTypes["CourseByIdResult"]
> = {
	__resolveType: TypeResolveFn<"Course" | "NotFoundError", ParentType, ContextType>
}

export type CourseClassResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClass"] = ResolversParentTypes["CourseClass"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	number: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	liveState: Resolver<Maybe<ResolversTypes["CourseClassLiveState"]>, ParentType, ContextType>
	videos: Resolver<Array<ResolversTypes["CourseClassVideo"]>, ParentType, ContextType>
	chapterCues: Resolver<Array<ResolversTypes["CourseClassChapterCue"]>, ParentType, ContextType>
	courseClassList: Resolver<Maybe<ResolversTypes["CourseClassList"]>, ParentType, ContextType>
	visibility: Resolver<Maybe<ResolversTypes["CourseClassVisibility"]>, ParentType, ContextType>
	publishedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassByIdResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassByIdResult"] = ResolversParentTypes["CourseClassByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClass" | "NotFoundError", ParentType, ContextType>
}

export type CourseClassChapterCueResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassChapterCue"] = ResolversParentTypes["CourseClassChapterCue"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	name: Resolver<ResolversTypes["String"], ParentType, ContextType>
	startSeconds: Resolver<ResolversTypes["Float"], ParentType, ContextType>
	endSeconds: Resolver<ResolversTypes["Float"], ParentType, ContextType>
	courseClass: Resolver<Maybe<ResolversTypes["CourseClass"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassListResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassList"] = ResolversParentTypes["CourseClassList"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	code: Resolver<ResolversTypes["String"], ParentType, ContextType>
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	classes: Resolver<Maybe<Array<ResolversTypes["CourseClass"]>>, ParentType, ContextType>
	courseEdition: Resolver<Maybe<ResolversTypes["CourseEdition"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassListByCodeResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassListByCodeResult"] = ResolversParentTypes["CourseClassListByCodeResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClassList" | "NotFoundError", ParentType, ContextType>
}

export type CourseClassListByIdResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassListByIdResult"] = ResolversParentTypes["CourseClassListByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseClassList" | "NotFoundError", ParentType, ContextType>
}

export type CourseClassLiveStateResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassLiveState"] = ResolversParentTypes["CourseClassLiveState"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	html: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	inProgress: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
	startDate: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	courseClass: Resolver<Maybe<ResolversTypes["CourseClass"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassVideoResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassVideo"] = ResolversParentTypes["CourseClassVideo"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	qualities: Resolver<Array<ResolversTypes["CourseClassVideoQuality"]>, ParentType, ContextType>
	courseClass: Resolver<Maybe<ResolversTypes["CourseClass"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassVideoFormatResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassVideoFormat"] = ResolversParentTypes["CourseClassVideoFormat"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	url: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	hasTorrent: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
	quality: Resolver<Maybe<ResolversTypes["CourseClassVideoQuality"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseClassVideoQualityResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseClassVideoQuality"] = ResolversParentTypes["CourseClassVideoQuality"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	height: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	width: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	video: Resolver<Maybe<ResolversTypes["CourseClassVideo"]>, ParentType, ContextType>
	formats: Resolver<Array<ResolversTypes["CourseClassVideoFormat"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseEditionResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseEdition"] = ResolversParentTypes["CourseEdition"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	semester: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	year: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	courseClassLists: Resolver<Array<ResolversTypes["CourseClassList"]>, ParentType, ContextType>
	course: Resolver<Maybe<ResolversTypes["Course"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CourseEditionByIdResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CourseEditionByIdResult"] = ResolversParentTypes["CourseEditionByIdResult"]
> = {
	__resolveType: TypeResolveFn<"CourseEdition" | "NotFoundError", ParentType, ContextType>
}

export type CreateCourseClassChapterCuePayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassChapterCuePayload"] = ResolversParentTypes["CreateCourseClassChapterCuePayload"]
> = {
	courseClassChapterCue: Resolver<ResolversTypes["CourseClassChapterCue"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateCourseClassChapterCueResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassChapterCueResult"] = ResolversParentTypes["CreateCourseClassChapterCueResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCourseClassChapterCuePayload" | "AuthenticationError" | "GenericError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type CreateCourseClassListPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassListPayload"] = ResolversParentTypes["CreateCourseClassListPayload"]
> = {
	courseClassList: Resolver<ResolversTypes["CourseClassList"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateCourseClassListResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassListResult"] = ResolversParentTypes["CreateCourseClassListResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCourseClassListPayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type CreateCourseClassPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassPayload"] = ResolversParentTypes["CreateCourseClassPayload"]
> = {
	courseClass: Resolver<ResolversTypes["CourseClass"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateCourseClassResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseClassResult"] = ResolversParentTypes["CreateCourseClassResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCourseClassPayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type CreateCoursePayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCoursePayload"] = ResolversParentTypes["CreateCoursePayload"]
> = {
	course: Resolver<ResolversTypes["Course"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateCourseResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreateCourseResult"] = ResolversParentTypes["CreateCourseResult"]
> = {
	__resolveType: TypeResolveFn<
		"CreateCoursePayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type CreatePostPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreatePostPayload"] = ResolversParentTypes["CreatePostPayload"]
> = {
	post: Resolver<ResolversTypes["Post"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreatePostResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["CreatePostResult"] = ResolversParentTypes["CreatePostResult"]
> = {
	__resolveType: TypeResolveFn<"CreatePostPayload" | "GenericError" | "AuthenticationError", ParentType, ContextType>
}

export type DeleteCourseClassChapterCuesFromCourseClassPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["DeleteCourseClassChapterCuesFromCourseClassPayload"] = ResolversParentTypes["DeleteCourseClassChapterCuesFromCourseClassPayload"]
> = {
	courseClass: Resolver<ResolversTypes["CourseClass"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteCourseClassChapterCuesFromCourseClassResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["DeleteCourseClassChapterCuesFromCourseClassResult"] = ResolversParentTypes["DeleteCourseClassChapterCuesFromCourseClassResult"]
> = {
	__resolveType: TypeResolveFn<
		"DeleteCourseClassChapterCuesFromCourseClassPayload" | "GenericError" | "NotFoundError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type DeletePostPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["DeletePostPayload"] = ResolversParentTypes["DeletePostPayload"]
> = {
	deleted: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeletePostResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["DeletePostResult"] = ResolversParentTypes["DeletePostResult"]
> = {
	__resolveType: TypeResolveFn<
		"DeletePostPayload" | "GenericError" | "AuthenticationError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type EmailNotValidatedErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["EmailNotValidatedError"] = ResolversParentTypes["EmailNotValidatedError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FaqResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Faq"] = ResolversParentTypes["Faq"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	title: Resolver<ResolversTypes["String"], ParentType, ContextType>
	content: Resolver<ResolversTypes["String"], ParentType, ContextType>
	isHtml: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GenerateLegacyJsonFilesPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["GenerateLegacyJsonFilesPayload"] = ResolversParentTypes["GenerateLegacyJsonFilesPayload"]
> = {
	modifiedFilesCount: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GenerateLegacyJsonFilesResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["GenerateLegacyJsonFilesResult"] = ResolversParentTypes["GenerateLegacyJsonFilesResult"]
> = {
	__resolveType: TypeResolveFn<"GenericError" | "GenerateLegacyJsonFilesPayload", ParentType, ContextType>
}

export type GenericErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["GenericError"] = ResolversParentTypes["GenericError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Grant"] = ResolversParentTypes["Grant"]
> = {
	token: Resolver<ResolversTypes["String"], ParentType, ContextType>
	refreshToken: Resolver<ResolversTypes["String"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["ISODate"], any> {
	name: "ISODate"
}

export interface IsoDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["ISODateTime"], any> {
	name: "ISODateTime"
}

export type InvalidEmailDomainResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["InvalidEmailDomain"] = ResolversParentTypes["InvalidEmailDomain"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type InvalidEmailDomainErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["InvalidEmailDomainError"] = ResolversParentTypes["InvalidEmailDomainError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type InvalidFormatErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["InvalidFormatError"] = ResolversParentTypes["InvalidFormatError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MaxLengthErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["MaxLengthError"] = ResolversParentTypes["MaxLengthError"]
> = {
	max: Resolver<ResolversTypes["Int"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MinLengthErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["MinLengthError"] = ResolversParentTypes["MinLengthError"]
> = {
	min: Resolver<ResolversTypes["Int"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	backup: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	backupDb: Resolver<
		Maybe<ResolversTypes["Void"]>,
		ParentType,
		ContextType,
		RequireFields<MutationBackupDbArgs, "secret">
	>
	createCourse: Resolver<
		ResolversTypes["CreateCourseResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseArgs, "input" | "secret">
	>
	createCourse_v2: Resolver<
		ResolversTypes["CreateCourseResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourse_V2Args, "input">
	>
	createCourseClass: Resolver<
		ResolversTypes["CreateCourseClassResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClassArgs, "input" | "secret">
	>
	createCourseClass_v2: Resolver<
		ResolversTypes["CreateCourseClassResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClass_V2Args, "input">
	>
	createCourseClassChapterCue: Resolver<
		ResolversTypes["CreateCourseClassChapterCueResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClassChapterCueArgs, "input">
	>
	createCourseClassList: Resolver<
		ResolversTypes["CreateCourseClassListResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClassListArgs, "input" | "secret">
	>
	createCourseClassList_v2: Resolver<
		ResolversTypes["CreateCourseClassListResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateCourseClassList_V2Args, "input">
	>
	createPost: Resolver<
		ResolversTypes["CreatePostResult"],
		ParentType,
		ContextType,
		RequireFields<MutationCreatePostArgs, "input">
	>
	deleteCourseClassChapterCuesFromCourseClass: Resolver<
		ResolversTypes["DeleteCourseClassChapterCuesFromCourseClassResult"],
		ParentType,
		ContextType,
		RequireFields<MutationDeleteCourseClassChapterCuesFromCourseClassArgs, "input">
	>
	deletePost: Resolver<
		ResolversTypes["DeletePostResult"],
		ParentType,
		ContextType,
		RequireFields<MutationDeletePostArgs, "id">
	>
	generateLegacyJsonFiles: Resolver<
		ResolversTypes["GenerateLegacyJsonFilesResult"],
		ParentType,
		ContextType,
		RequireFields<MutationGenerateLegacyJsonFilesArgs, "secret">
	>
	refreshToken: Resolver<
		ResolversTypes["RefreshTokenResult"],
		ParentType,
		ContextType,
		RequireFields<MutationRefreshTokenArgs, "input">
	>
	restoreDb: Resolver<
		Maybe<ResolversTypes["Void"]>,
		ParentType,
		ContextType,
		RequireFields<MutationRestoreDbArgs, "secret">
	>
	restoreDb_v2: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	sendVerifyEmail: Resolver<
		ResolversTypes["SendVerifyEmailResult"],
		ParentType,
		ContextType,
		RequireFields<MutationSendVerifyEmailArgs, "input">
	>
	setCourseClassLiveState: Resolver<
		ResolversTypes["SetCourseClassLiveStateResult"],
		ParentType,
		ContextType,
		RequireFields<MutationSetCourseClassLiveStateArgs, "input" | "secret">
	>
	setCourseClassLiveState_v2: Resolver<
		ResolversTypes["SetCourseClassLiveStateResult"],
		ParentType,
		ContextType,
		RequireFields<MutationSetCourseClassLiveState_V2Args, "input">
	>
	signIn: Resolver<
		ResolversTypes["SignInResult"],
		ParentType,
		ContextType,
		RequireFields<MutationSignInArgs, "input">
	>
	signUp: Resolver<
		Maybe<ResolversTypes["SignUpResult"]>,
		ParentType,
		ContextType,
		RequireFields<MutationSignUpArgs, "input">
	>
	syncCourseClassVideosForClass: Resolver<
		Maybe<ResolversTypes["SyncCourseClassVideosForClassResult"]>,
		ParentType,
		ContextType,
		RequireFields<MutationSyncCourseClassVideosForClassArgs, "courseClassRef">
	>
	updateCourse: Resolver<
		ResolversTypes["UpdateCourseResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseArgs, "ref" | "input">
	>
	updateCourseClass: Resolver<
		ResolversTypes["UpdateCourseClassResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseClassArgs, "ref" | "input" | "secret">
	>
	updateCourseClass_v2: Resolver<
		ResolversTypes["UpdateCourseClassResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseClass_V2Args, "ref" | "input">
	>
	updateCourseClassList: Resolver<
		ResolversTypes["UpdateCourseClassListResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseClassListArgs, "ref" | "input" | "secret">
	>
	updateCourseClassList_v2: Resolver<
		ResolversTypes["UpdateCourseClassListResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateCourseClassList_V2Args, "ref" | "input">
	>
	updatePost: Resolver<
		ResolversTypes["UpdatePostResult"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdatePostArgs, "id" | "input">
	>
}

export type NotFoundErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["NotFoundError"] = ResolversParentTypes["NotFoundError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	title: Resolver<ResolversTypes["String"], ParentType, ContextType>
	mdContent: Resolver<ResolversTypes["String"], ParentType, ContextType>
	publishedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	createdBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	updatedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	updatedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	deletedAt: Resolver<Maybe<ResolversTypes["ISODateTime"]>, ParentType, ContextType>
	deletedBy: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	courseByCode: Resolver<
		ResolversTypes["CourseByCodeResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseByCodeArgs, "code">
	>
	courseById: Resolver<
		ResolversTypes["CourseByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseByIdArgs, "id">
	>
	courseClassById: Resolver<
		ResolversTypes["CourseClassByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassByIdArgs, "id">
	>
	courseClassListByCode: Resolver<
		ResolversTypes["CourseClassListByCodeResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassListByCodeArgs, "code">
	>
	courseClassListById: Resolver<
		ResolversTypes["CourseClassListByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseClassListByIdArgs, "id">
	>
	courseEditionById: Resolver<
		ResolversTypes["CourseEditionByIdResult"],
		ParentType,
		ContextType,
		RequireFields<QueryCourseEditionByIdArgs, "id">
	>
	courses: Resolver<Array<ResolversTypes["Course"]>, ParentType, ContextType>
	faqs: Resolver<Array<ResolversTypes["Faq"]>, ParentType, ContextType>
	latestCourseClasses: Resolver<Array<ResolversTypes["CourseClass"]>, ParentType, ContextType>
	posts: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>
}

export type RefreshTokenPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["RefreshTokenPayload"] = ResolversParentTypes["RefreshTokenPayload"]
> = {
	grant: Resolver<ResolversTypes["Grant"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RefreshTokenResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["RefreshTokenResult"] = ResolversParentTypes["RefreshTokenResult"]
> = {
	__resolveType: TypeResolveFn<
		"RefreshTokenPayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type RequiredFieldErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["RequiredFieldError"] = ResolversParentTypes["RequiredFieldError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendVerifyEmailPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SendVerifyEmailPayload"] = ResolversParentTypes["SendVerifyEmailPayload"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendVerifyEmailResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SendVerifyEmailResult"] = ResolversParentTypes["SendVerifyEmailResult"]
> = {
	__resolveType: TypeResolveFn<"SendVerifyEmailPayload" | "GenericError", ParentType, ContextType>
}

export type SetCourseClassLiveStatePayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SetCourseClassLiveStatePayload"] = ResolversParentTypes["SetCourseClassLiveStatePayload"]
> = {
	courseClassLiveState: Resolver<Maybe<ResolversTypes["CourseClassLiveState"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetCourseClassLiveStateResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SetCourseClassLiveStateResult"] = ResolversParentTypes["SetCourseClassLiveStateResult"]
> = {
	__resolveType: TypeResolveFn<
		"SetCourseClassLiveStatePayload" | "GenericError" | "AuthenticationError",
		ParentType,
		ContextType
	>
}

export type SignInEmailErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignInEmailError"] = ResolversParentTypes["SignInEmailError"]
> = {
	__resolveType: TypeResolveFn<"RequiredFieldError" | "InvalidFormatError", ParentType, ContextType>
}

export type SignInPasswordErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignInPasswordError"] = ResolversParentTypes["SignInPasswordError"]
> = {
	__resolveType: TypeResolveFn<"RequiredFieldError", ParentType, ContextType>
}

export type SignInPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignInPayload"] = ResolversParentTypes["SignInPayload"]
> = {
	grant: Resolver<ResolversTypes["Grant"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SignInResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignInResult"] = ResolversParentTypes["SignInResult"]
> = {
	__resolveType: TypeResolveFn<
		"SignInPayload" | "GenericError" | "AuthenticationError" | "SignInValidationErrors" | "EmailNotValidatedError",
		ParentType,
		ContextType
	>
}

export type SignInValidationErrorsResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignInValidationErrors"] = ResolversParentTypes["SignInValidationErrors"]
> = {
	email: Resolver<Maybe<Array<ResolversTypes["SignInEmailError"]>>, ParentType, ContextType>
	password: Resolver<Maybe<Array<ResolversTypes["SignInPasswordError"]>>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SignUpEmailErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpEmailError"] = ResolversParentTypes["SignUpEmailError"]
> = {
	__resolveType: TypeResolveFn<
		"RequiredFieldError" | "InvalidEmailDomainError" | "InvalidFormatError" | "MaxLengthError",
		ParentType,
		ContextType
	>
}

export type SignUpEmailNotSentPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpEmailNotSentPayload"] = ResolversParentTypes["SignUpEmailNotSentPayload"]
> = {
	issueId: Resolver<ResolversTypes["String"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SignUpFirstNameErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpFirstNameError"] = ResolversParentTypes["SignUpFirstNameError"]
> = {
	__resolveType: TypeResolveFn<"RequiredFieldError" | "MinLengthError" | "MaxLengthError", ParentType, ContextType>
}

export type SignUpLastNameErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpLastNameError"] = ResolversParentTypes["SignUpLastNameError"]
> = {
	__resolveType: TypeResolveFn<"MaxLengthError", ParentType, ContextType>
}

export type SignUpPasswordErrorResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpPasswordError"] = ResolversParentTypes["SignUpPasswordError"]
> = {
	__resolveType: TypeResolveFn<"RequiredFieldError" | "MinLengthError" | "MaxLengthError", ParentType, ContextType>
}

export type SignUpResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpResult"] = ResolversParentTypes["SignUpResult"]
> = {
	__resolveType: TypeResolveFn<
		"GenericError" | "AuthenticationError" | "SignUpValidationErrors" | "SignUpEmailNotSentPayload",
		ParentType,
		ContextType
	>
}

export type SignUpValidationErrorsResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SignUpValidationErrors"] = ResolversParentTypes["SignUpValidationErrors"]
> = {
	email: Resolver<Maybe<Array<ResolversTypes["SignUpEmailError"]>>, ParentType, ContextType>
	firstName: Resolver<Maybe<Array<ResolversTypes["SignUpFirstNameError"]>>, ParentType, ContextType>
	lastName: Resolver<Maybe<Array<ResolversTypes["SignUpLastNameError"]>>, ParentType, ContextType>
	password: Resolver<Maybe<Array<ResolversTypes["SignUpPasswordError"]>>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SyncCourseClassVideosForClassPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SyncCourseClassVideosForClassPayload"] = ResolversParentTypes["SyncCourseClassVideosForClassPayload"]
> = {
	courseClass: Resolver<ResolversTypes["CourseClass"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SyncCourseClassVideosForClassResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["SyncCourseClassVideosForClassResult"] = ResolversParentTypes["SyncCourseClassVideosForClassResult"]
> = {
	__resolveType: TypeResolveFn<
		"SyncCourseClassVideosForClassPayload" | "NotFoundError" | "AuthenticationError" | "GenericError",
		ParentType,
		ContextType
	>
}

export type UpdateCourseClassListPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCourseClassListPayload"] = ResolversParentTypes["UpdateCourseClassListPayload"]
> = {
	courseClassList: Resolver<ResolversTypes["CourseClassList"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateCourseClassListResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCourseClassListResult"] = ResolversParentTypes["UpdateCourseClassListResult"]
> = {
	__resolveType: TypeResolveFn<
		"UpdateCourseClassListPayload" | "GenericError" | "AuthenticationError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type UpdateCourseClassPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCourseClassPayload"] = ResolversParentTypes["UpdateCourseClassPayload"]
> = {
	courseClass: Resolver<ResolversTypes["CourseClass"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateCourseClassResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCourseClassResult"] = ResolversParentTypes["UpdateCourseClassResult"]
> = {
	__resolveType: TypeResolveFn<
		"UpdateCourseClassPayload" | "GenericError" | "AuthenticationError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type UpdateCoursePayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCoursePayload"] = ResolversParentTypes["UpdateCoursePayload"]
> = {
	course: Resolver<ResolversTypes["Course"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateCourseResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdateCourseResult"] = ResolversParentTypes["UpdateCourseResult"]
> = {
	__resolveType: TypeResolveFn<
		"UpdateCoursePayload" | "GenericError" | "AuthenticationError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type UpdatePostPayloadResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdatePostPayload"] = ResolversParentTypes["UpdatePostPayload"]
> = {
	post: Resolver<ResolversTypes["Post"], ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdatePostResultResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["UpdatePostResult"] = ResolversParentTypes["UpdatePostResult"]
> = {
	__resolveType: TypeResolveFn<
		"UpdatePostPayload" | "GenericError" | "AuthenticationError" | "NotFoundError",
		ParentType,
		ContextType
	>
}

export type UserResolvers<
	ContextType = RequestContext,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
	name: Resolver<ResolversTypes["String"], ParentType, ContextType>
	givenName: Resolver<ResolversTypes["String"], ParentType, ContextType>
	familyName: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
	name: "Void"
}

export type _Resolvers<ContextType = RequestContext> = {
	AllowedEmail: AllowedEmailResolvers<ContextType>
	AuthenticationError: AuthenticationErrorResolvers<ContextType>
	Course: CourseResolvers<ContextType>
	CourseByCodeResult: CourseByCodeResultResolvers<ContextType>
	CourseByIdResult: CourseByIdResultResolvers<ContextType>
	CourseClass: CourseClassResolvers<ContextType>
	CourseClassByIdResult: CourseClassByIdResultResolvers<ContextType>
	CourseClassChapterCue: CourseClassChapterCueResolvers<ContextType>
	CourseClassList: CourseClassListResolvers<ContextType>
	CourseClassListByCodeResult: CourseClassListByCodeResultResolvers<ContextType>
	CourseClassListByIdResult: CourseClassListByIdResultResolvers<ContextType>
	CourseClassLiveState: CourseClassLiveStateResolvers<ContextType>
	CourseClassVideo: CourseClassVideoResolvers<ContextType>
	CourseClassVideoFormat: CourseClassVideoFormatResolvers<ContextType>
	CourseClassVideoQuality: CourseClassVideoQualityResolvers<ContextType>
	CourseEdition: CourseEditionResolvers<ContextType>
	CourseEditionByIdResult: CourseEditionByIdResultResolvers<ContextType>
	CreateCourseClassChapterCuePayload: CreateCourseClassChapterCuePayloadResolvers<ContextType>
	CreateCourseClassChapterCueResult: CreateCourseClassChapterCueResultResolvers<ContextType>
	CreateCourseClassListPayload: CreateCourseClassListPayloadResolvers<ContextType>
	CreateCourseClassListResult: CreateCourseClassListResultResolvers<ContextType>
	CreateCourseClassPayload: CreateCourseClassPayloadResolvers<ContextType>
	CreateCourseClassResult: CreateCourseClassResultResolvers<ContextType>
	CreateCoursePayload: CreateCoursePayloadResolvers<ContextType>
	CreateCourseResult: CreateCourseResultResolvers<ContextType>
	CreatePostPayload: CreatePostPayloadResolvers<ContextType>
	CreatePostResult: CreatePostResultResolvers<ContextType>
	DeleteCourseClassChapterCuesFromCourseClassPayload: DeleteCourseClassChapterCuesFromCourseClassPayloadResolvers<ContextType>
	DeleteCourseClassChapterCuesFromCourseClassResult: DeleteCourseClassChapterCuesFromCourseClassResultResolvers<ContextType>
	DeletePostPayload: DeletePostPayloadResolvers<ContextType>
	DeletePostResult: DeletePostResultResolvers<ContextType>
	EmailNotValidatedError: EmailNotValidatedErrorResolvers<ContextType>
	Faq: FaqResolvers<ContextType>
	GenerateLegacyJsonFilesPayload: GenerateLegacyJsonFilesPayloadResolvers<ContextType>
	GenerateLegacyJsonFilesResult: GenerateLegacyJsonFilesResultResolvers<ContextType>
	GenericError: GenericErrorResolvers<ContextType>
	Grant: GrantResolvers<ContextType>
	ISODate: GraphQLScalarType
	ISODateTime: GraphQLScalarType
	InvalidEmailDomain: InvalidEmailDomainResolvers<ContextType>
	InvalidEmailDomainError: InvalidEmailDomainErrorResolvers<ContextType>
	InvalidFormatError: InvalidFormatErrorResolvers<ContextType>
	MaxLengthError: MaxLengthErrorResolvers<ContextType>
	MinLengthError: MinLengthErrorResolvers<ContextType>
	Mutation: MutationResolvers<ContextType>
	NotFoundError: NotFoundErrorResolvers<ContextType>
	Post: PostResolvers<ContextType>
	Query: QueryResolvers<ContextType>
	RefreshTokenPayload: RefreshTokenPayloadResolvers<ContextType>
	RefreshTokenResult: RefreshTokenResultResolvers<ContextType>
	RequiredFieldError: RequiredFieldErrorResolvers<ContextType>
	SendVerifyEmailPayload: SendVerifyEmailPayloadResolvers<ContextType>
	SendVerifyEmailResult: SendVerifyEmailResultResolvers<ContextType>
	SetCourseClassLiveStatePayload: SetCourseClassLiveStatePayloadResolvers<ContextType>
	SetCourseClassLiveStateResult: SetCourseClassLiveStateResultResolvers<ContextType>
	SignInEmailError: SignInEmailErrorResolvers<ContextType>
	SignInPasswordError: SignInPasswordErrorResolvers<ContextType>
	SignInPayload: SignInPayloadResolvers<ContextType>
	SignInResult: SignInResultResolvers<ContextType>
	SignInValidationErrors: SignInValidationErrorsResolvers<ContextType>
	SignUpEmailError: SignUpEmailErrorResolvers<ContextType>
	SignUpEmailNotSentPayload: SignUpEmailNotSentPayloadResolvers<ContextType>
	SignUpFirstNameError: SignUpFirstNameErrorResolvers<ContextType>
	SignUpLastNameError: SignUpLastNameErrorResolvers<ContextType>
	SignUpPasswordError: SignUpPasswordErrorResolvers<ContextType>
	SignUpResult: SignUpResultResolvers<ContextType>
	SignUpValidationErrors: SignUpValidationErrorsResolvers<ContextType>
	SyncCourseClassVideosForClassPayload: SyncCourseClassVideosForClassPayloadResolvers<ContextType>
	SyncCourseClassVideosForClassResult: SyncCourseClassVideosForClassResultResolvers<ContextType>
	UpdateCourseClassListPayload: UpdateCourseClassListPayloadResolvers<ContextType>
	UpdateCourseClassListResult: UpdateCourseClassListResultResolvers<ContextType>
	UpdateCourseClassPayload: UpdateCourseClassPayloadResolvers<ContextType>
	UpdateCourseClassResult: UpdateCourseClassResultResolvers<ContextType>
	UpdateCoursePayload: UpdateCoursePayloadResolvers<ContextType>
	UpdateCourseResult: UpdateCourseResultResolvers<ContextType>
	UpdatePostPayload: UpdatePostPayloadResolvers<ContextType>
	UpdatePostResult: UpdatePostResultResolvers<ContextType>
	User: UserResolvers<ContextType>
	Void: GraphQLScalarType
}

/**
 * @deprecated
 * Use "_Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = RequestContext> = _Resolvers<ContextType>

export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<{
	[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
		? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
			? TParent[TResolverKey] extends TResolverValueType
				? TResolvers[TResolverKey] | undefined
				: TResolvers[TResolverKey]
			: TResolvers[TResolverKey]
		: TResolvers[TResolverKey]
}>

export type CustomResolvers = {
	AllowedEmail: ResolversByParent<_Resolvers["AllowedEmail"], AllowedEmailParent>
	AuthenticationError: ResolversByParent<_Resolvers["AuthenticationError"], AuthenticationErrorParent>
	Course: ResolversByParent<_Resolvers["Course"], CourseParent>
	CourseClass: ResolversByParent<_Resolvers["CourseClass"], CourseClassParent>
	CourseClassChapterCue: ResolversByParent<_Resolvers["CourseClassChapterCue"], CourseClassChapterCueParent>
	CourseClassList: ResolversByParent<_Resolvers["CourseClassList"], CourseClassListParent>
	CourseClassLiveState: ResolversByParent<_Resolvers["CourseClassLiveState"], CourseClassLiveStateParent>
	CourseClassVideo: ResolversByParent<_Resolvers["CourseClassVideo"], CourseClassVideoParent>
	CourseClassVideoFormat: ResolversByParent<_Resolvers["CourseClassVideoFormat"], CourseClassVideoFormatParent>
	CourseClassVideoQuality: ResolversByParent<_Resolvers["CourseClassVideoQuality"], CourseClassVideoQualityParent>
	CourseEdition: ResolversByParent<_Resolvers["CourseEdition"], CourseEditionParent>
	Faq: ResolversByParent<_Resolvers["Faq"], FaqParent>
	GenericError: ResolversByParent<_Resolvers["GenericError"], GenericErrorParent>
	Grant: ResolversByParent<_Resolvers["Grant"], GrantParent>
	InvalidEmailDomain: ResolversByParent<_Resolvers["InvalidEmailDomain"], InvalidEmailDomainParent>
	InvalidEmailDomainError: ResolversByParent<_Resolvers["InvalidEmailDomainError"], InvalidEmailDomainErrorParent>
	InvalidFormatError: ResolversByParent<_Resolvers["InvalidFormatError"], InvalidFormatErrorParent>
	MaxLengthError: ResolversByParent<_Resolvers["MaxLengthError"], MaxLengthErrorParent>
	MinLengthError: ResolversByParent<_Resolvers["MinLengthError"], MinLengthErrorParent>
	CreateCoursePayload: ResolversByParent<_Resolvers["CreateCoursePayload"], CreateCoursePayloadParent>
	CreateCourseClassPayload: ResolversByParent<_Resolvers["CreateCourseClassPayload"], CreateCourseClassPayloadParent>
	CreateCourseClassChapterCuePayload: ResolversByParent<
		_Resolvers["CreateCourseClassChapterCuePayload"],
		CreateCourseClassChapterCuePayloadParent
	>
	CreateCourseClassListPayload: ResolversByParent<
		_Resolvers["CreateCourseClassListPayload"],
		CreateCourseClassListPayloadParent
	>
	CreatePostPayload: ResolversByParent<_Resolvers["CreatePostPayload"], CreatePostPayloadParent>
	DeleteCourseClassChapterCuesFromCourseClassPayload: ResolversByParent<
		_Resolvers["DeleteCourseClassChapterCuesFromCourseClassPayload"],
		DeleteCourseClassChapterCuesFromCourseClassPayloadParent
	>
	DeletePostPayload: ResolversByParent<_Resolvers["DeletePostPayload"], DeletePostPayloadParent>
	GenerateLegacyJsonFilesPayload: ResolversByParent<
		_Resolvers["GenerateLegacyJsonFilesPayload"],
		GenerateLegacyJsonFilesPayloadParent
	>
	RefreshTokenPayload: ResolversByParent<_Resolvers["RefreshTokenPayload"], RefreshTokenPayloadParent>
	SendVerifyEmailPayload: ResolversByParent<_Resolvers["SendVerifyEmailPayload"], SendVerifyEmailPayloadParent>
	SetCourseClassLiveStatePayload: ResolversByParent<
		_Resolvers["SetCourseClassLiveStatePayload"],
		SetCourseClassLiveStatePayloadParent
	>
	EmailNotValidatedError: ResolversByParent<_Resolvers["EmailNotValidatedError"], EmailNotValidatedErrorParent>
	SignInPayload: ResolversByParent<_Resolvers["SignInPayload"], SignInPayloadParent>
	SignInValidationErrors: ResolversByParent<_Resolvers["SignInValidationErrors"], SignInValidationErrorsParent>
	SignUpEmailNotSentPayload: ResolversByParent<
		_Resolvers["SignUpEmailNotSentPayload"],
		SignUpEmailNotSentPayloadParent
	>
	SignUpValidationErrors: ResolversByParent<_Resolvers["SignUpValidationErrors"], SignUpValidationErrorsParent>
	SyncCourseClassVideosForClassPayload: ResolversByParent<
		_Resolvers["SyncCourseClassVideosForClassPayload"],
		SyncCourseClassVideosForClassPayloadParent
	>
	UpdateCoursePayload: ResolversByParent<_Resolvers["UpdateCoursePayload"], UpdateCoursePayloadParent>
	UpdateCourseClassPayload: ResolversByParent<_Resolvers["UpdateCourseClassPayload"], UpdateCourseClassPayloadParent>
	UpdateCourseClassListPayload: ResolversByParent<
		_Resolvers["UpdateCourseClassListPayload"],
		UpdateCourseClassListPayloadParent
	>
	UpdatePostPayload: ResolversByParent<_Resolvers["UpdatePostPayload"], UpdatePostPayloadParent>
	NotFoundError: ResolversByParent<_Resolvers["NotFoundError"], NotFoundErrorParent>
	Post: ResolversByParent<_Resolvers["Post"], PostParent>
	RequiredFieldError: ResolversByParent<_Resolvers["RequiredFieldError"], RequiredFieldErrorParent>
	User: ResolversByParent<_Resolvers["User"], UserParent>
}

export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers
