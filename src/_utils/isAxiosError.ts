import { AxiosError } from "axios";

import { hasProperty } from "./hasProperty";

export const isAxiosError = (response: object): response is AxiosError => hasProperty(response, "isAxiosError");
