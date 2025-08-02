import {
  CompanySize,
  CompanyType,
  EmploymentType,
  GrowthType,
  Industry,
  WorkMode,
} from "../../types";

export interface IAddCompanyOrSalaryFormValueTypes {
  growthType: GrowthType | null;
  companyName: string;
  industry: Industry | null;
  companySize: CompanySize | null;
  companyType: CompanyType | null;
  jobTitle: string;
  department: string;
  employmentType: EmploymentType | null;
  workMode: WorkMode | null;
  location: string;
  baseSalary: string;
  bonus?: string;
  stocks?: string;
}

export const InitAddCompanyOrSalaryFormValues: IAddCompanyOrSalaryFormValueTypes =
  {
    growthType: null,
    companyName: "",
    industry: null,
    companySize: null,
    companyType: null,
    jobTitle: "",
    department: "",
    employmentType: null,
    workMode: null,
    location: "",
    baseSalary: "",
    bonus: "0",
    stocks: "0",
  };
