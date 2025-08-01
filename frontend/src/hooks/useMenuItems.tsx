import { RiHistoryFill } from "react-icons/ri";
import {
  MdOutlineSavings,
  MdWorkOutline,
  MdOutlineDashboard,
} from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { ROUTES } from "../constants";

const useMenuItemsList = () => {
  const commonIconStyles = {
    fontSize: "20px",
  };
  return [
    {
      text: "Dashboard",
      icon: <MdOutlineDashboard style={{ ...commonIconStyles }} />,
      path: ROUTES.DASHBOARD,
    },
    {
      text: "Work Experience",
      icon: <MdWorkOutline style={{ ...commonIconStyles }} />,
      path: ROUTES.WORK_EXPERIENCE,
    },
    {
      text: "Add Company/Salary",
      icon: <MdOutlineBusinessCenter style={{ ...commonIconStyles }} />,
      path: ROUTES.ADD_COMPANY,
    },
    {
      text: "Earning History",
      icon: <RiHistoryFill style={{ ...commonIconStyles }} />,
      path: ROUTES.EARNING_HISTORY,
    },
    {
      text: "Tax Analysis",
      icon: <BsGraphUp style={{ ...commonIconStyles }} />,
      path: ROUTES.TAX_ANALYSIS,
    },
    {
      text: "PF Details",
      icon: <MdOutlineSavings style={{ ...commonIconStyles }} />,
      path: ROUTES.PF_DETAILS,
    },
  ];
};

export default useMenuItemsList;
