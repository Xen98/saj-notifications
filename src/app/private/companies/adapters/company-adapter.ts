import { Company } from "../models";

export const CompanyOptionAdapter = (company: Company) => {
  return {
    id: company.id,
    label: company.company,
    value: company.id,
    default: false
  };
};
