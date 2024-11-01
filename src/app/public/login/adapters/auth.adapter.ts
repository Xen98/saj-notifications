import { LogInResponse } from "../models";

export const AuthAdapter = (loginResponse: LogInResponse) => loginResponse.token;
