import { hasProperty } from "@sangonz193/utils/hasProperty"
import { AxiosError } from "axios"

export const isAxiosError = (response: object): response is AxiosError => hasProperty(response, "isAxiosError")
