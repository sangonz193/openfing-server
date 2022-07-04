import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { AllowedEmailRow } from "../AllowedEmail/AllowedEmail.entity.types"

export type SaveAllowedEmailData = AllowedEmailRow

export type FindOneAllowedEmailOptions = {
	emailAddress: string
}

export type CreateAllowedEmailData = SafeOmit<AllowedEmailRow, "id"> & Partial<Pick<AllowedEmailRow, "id">>

export type AllowedEmailRepository = {
	findAll: () => Promise<AllowedEmailRow[]>
	findOne: (options: FindOneAllowedEmailOptions) => Promise<AllowedEmailRow | null>
	createAndSave: (data: CreateAllowedEmailData) => Promise<AllowedEmailRow>
	delete: (options: { email: string }) => Promise<void>
}
