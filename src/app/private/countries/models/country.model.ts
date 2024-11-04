import { ServerResponse } from "@/models";

export interface Country {
  id: number;
  country: string;
}

export interface CountriesResponse extends ServerResponse {
  data: Country[];
}
