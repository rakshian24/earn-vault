import { Box, Stack, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { LeftNav } from "../components/LeftNav";
import { colors, ROUTES, screenSize } from "../constants";
import { TopAppBar } from "./TopAppBar";
import { BottomNav } from "./BottomNav";

export const AppLayout = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isPcAndAbove = useMediaQuery(`(max-width:${screenSize.pc})`);

  const { pathname } = useLocation();

  const isCurrentPathNameHistory = pathname === ROUTES.EARNING_HISTORY;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        flexDirection: isTablet ? "column" : "row",
      }}
    >
      {!isTablet && <LeftNav />}

      {isTablet && <TopAppBar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: isCurrentPathNameHistory ? colors.white : colors.lightGrey1,
          height: !isTablet ? "calc(100vh - 120px)" : "100vh",
          overflowY: "auto",
          mb: isTablet ? "56px" : "0px",
        }}
      >
        <Stack
          sx={{
            maxWidth: "1600px",
            ...(isPcAndAbove && { width: "100%" }),
            margin: isTablet ? "0" : "0 auto",
            height: isTablet ? "auto" : "100%",
          }}
        >
          <Outlet />
        </Stack>
      </Box>

      {isTablet && <BottomNav />}
    </Box>
  );
};
