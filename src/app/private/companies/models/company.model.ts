import { ServerResponse } from "@/models";

export interface Company {
  id: number;
  company: string;
}

export interface CompaniesResponse extends ServerResponse {
  data: Company[];
}
