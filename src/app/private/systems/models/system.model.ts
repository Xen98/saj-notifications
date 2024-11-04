import { ServerResponse } from "@/models";

export interface System {
  id: number;
  system: string;
}

export interface SystemsResponse extends ServerResponse {
  data: System[];
}
