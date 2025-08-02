import { INDIAN_RUPEE_SYMBOL } from "../constants";
import {
  CompanyType,
  EmploymentType,
  GrowthType,
  Industry,
  WorkMode,
} from "../types";

export const textInputRegex =
  /^(?!\s+$)[~!\s@#$%^&*()_+=[\]{}|;':",./<>?a-zA-Z0-9-]+$/;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NumberRegex = /^[1-9]\d*$/;

export const Windows1252Regex =
  /^(?!\s+$)[~!\s@#$%^&*()_+=[\]{}|;':",./<>?a-zA-Z0-9-]+$/;

export const isRunningStandalone = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

export const isAppRunningOnIos16 = (): boolean => {
  const userAgent = window?.navigator.userAgent || "";
  return userAgent.includes("iPhone OS 16");
};

export const isStandAloneAndRunningOnIos16 = () =>
  isRunningStandalone() && isAppRunningOnIos16();

export const getInitials = (str: string = "") => {
  if (!str) return "RS";

  const initials = str
    .split(" ")
    .map(
      (name, index, arr) => (index === 0 || index === arr.length - 1) && name[0]
    )
    .filter((initial) => initial)
    .join("");

  return initials.toUpperCase() || "RS";
};

export const capitalizeFirstLetter = (name: string = ""): string => {
  if (!name) return name;

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const growthTypeLabels: Record<string, any> = {
  [GrowthType.COMPANY]: {
    title: "New Company",
    description: "Add a new workplace",
  },
  [GrowthType.SALARY]: {
    title: "Salary Update",
    description: "Promotion/Appraisal",
  },
};

export const industryLabels: Record<string, string> = {
  [Industry.TECHNOLOGY]: "Technology",
  [Industry.FINANCE]: "Finance",
  [Industry.MANUFACTURING]: "Manufacturing",
  [Industry.HEALTH_CARE]: "Health care",
  [Industry.OTHER]: "Other",
};

export const companyTypeLabels: Record<string, string> = {
  [CompanyType.START_UP]: "Start up",
  [CompanyType.MNC]: "MNC",
  [CompanyType.GOVERNMENT]: "Government",
  [CompanyType["NON-PROFIT"]]: "Non-profit",
};

export const employmentTypeLabels: Record<string, string> = {
  [EmploymentType.FULL_TIME]: "Full-time",
  [EmploymentType.PART_TIME]: "Part-time",
  [EmploymentType.CONTRACT]: "Contract",
  [EmploymentType.INTERNSHIP]: "Internship",
};

export const workModeLabels: Record<string, string> = {
  [WorkMode.ON_SITE]: "On-site",
  [WorkMode.REMOTE]: "Remote",
  [WorkMode.HYBRID]: "Hybrid",
};

export const formatNumber = (
  num: number,
  isUSD?: boolean,
  showDecimals?: boolean
) => {
  const options = showDecimals
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : {};
  const formattedNumber = new Intl.NumberFormat(
    isUSD ? "en-US" : "en-IN",
    options
  ).format(num);

  const currencySymbol = isUSD ? "$" : INDIAN_RUPEE_SYMBOL;

  return `${currencySymbol}${formattedNumber}`;
};
