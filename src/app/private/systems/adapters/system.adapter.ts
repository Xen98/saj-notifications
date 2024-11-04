import { System } from "../models";

export const SystemOptionAdapter = (system: System) => {
  return {
    id: system.id,
    label: system.system,
    value: system.id,
    default: false
  };
};
