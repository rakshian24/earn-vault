import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate, useLocation } from "react-router-dom";
import { colors, ROUTES } from "../constants";
import { isRunningStandalone } from "../utils";
import { WorkOutline, WorkOutlineOutlined } from "@mui/icons-material";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const BottomNavigationActionStyles = {
    "&.Mui-selected": {
      color: colors.primary,
      borderTop: `3px solid ${colors.primary}`,
      mt: "-3px",
    },
  };

  const commonIconStyles = {
    fontSize: "24px",
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #ddd",
        paddingBottom: isRunningStandalone()
          ? "40px"
          : "env(safe-area-inset-bottom)",
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentPath}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction
          label="Home"
          value={ROUTES.DASHBOARD}
          icon={<HomeIcon sx={{ ...commonIconStyles }} />}
          sx={BottomNavigationActionStyles}
        />
        <BottomNavigationAction
          label="History"
          value={ROUTES.EARNING_HISTORY}
          icon={<HistoryIcon sx={{ ...commonIconStyles }} />}
          sx={BottomNavigationActionStyles}
        />
        <BottomNavigationAction
          label="Add"
          value={ROUTES.ADD_COMPANY}
          icon={<AddIcon sx={{ ...commonIconStyles }} />}
          sx={BottomNavigationActionStyles}
        />
        <BottomNavigationAction
          label="Experience"
          value={ROUTES.WORK_EXPERIENCE}
          icon={<WorkOutline sx={{ ...commonIconStyles, fontSize: "22px" }} />}
          sx={BottomNavigationActionStyles}
        />
        <BottomNavigationAction
          label="Reports"
          value={ROUTES.TAX_ANALYSIS}
          icon={<BarChartIcon sx={{ ...commonIconStyles }} />}
          sx={BottomNavigationActionStyles}
        />
      </BottomNavigation>
    </Paper>
  );
};
