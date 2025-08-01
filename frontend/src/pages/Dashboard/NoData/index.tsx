import { Stack, Avatar, Typography } from "@mui/material";
import { FaVault, FaTimeline } from "react-icons/fa6";
import { colors } from "../../../constants";
import NoDataActionCard from "./NoDataActionCard";

const NoData = () => {
  return (
    <Stack gap={3} mt={1}>
      <Stack gap={2}>
        <Avatar
          sx={{
            backgroundColor: colors.primaryBg,
            color: colors.primary,
            p: 1.5,
            alignSelf: "center",
          }}
        >
          <FaVault style={{ fontSize: "26px", color: colors.primary }} />
        </Avatar>
        <Stack textAlign={"center"} gap={1}>
          <Typography variant="h6" fontWeight={600}>
            Welcome to EarnVault!
          </Typography>
          <Typography variant="body2" color="text.secondary" px={1}>
            Your personal career and compensation <br />
            tracking app. Let&apos;s start building your <br />
            complete professional journey <br />
            and lifetime earning history.
          </Typography>
        </Stack>
      </Stack>

      <Stack gap={2} mt={1}>
        <NoDataActionCard
          icon={<FaTimeline color={colors.primary} />}
          title="Enter Your Job History"
          description="Add all your jobs - past and present - to track your complete
                lifetime earnings."
          buttonText="Start Career Timeline"
        />

        <NoDataActionCard
          icon={<FaTimeline color={colors.skyBlue} />}
          title="Track Earnings & Benefits"
          description="Record salaries, bonuses, PF, ESOP, and all compensation details."
          buttonText="Add Earnings"
          color={colors.skyBlue}
          bgColor={colors.skyBlueBg}
        />
      </Stack>
    </Stack>
  );
};

export default NoData;
