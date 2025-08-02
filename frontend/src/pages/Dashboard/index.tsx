import { Stack, useMediaQuery } from "@mui/material";
import { screenSize } from "../../constants";
import NoData from "./NoData";
import CareerTimeline from "./CareerTimeline";
import StatCards from "./StatCards";
import WelcomeCard from "./WelcomeCard";
import EarningsGrowthChart from "./EarningsGrowthChart";

type Props = {};

const Dashboard = (props: Props) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack p={isTablet ? 2 : 3} gap={isTablet ? 2 : 3} pb={isTablet ? 6 : 0}>
      {/* <NoData /> */}
      <WelcomeCard />
      <StatCards />
      <EarningsGrowthChart />
      <CareerTimeline />
    </Stack>
  );
};

export default Dashboard;
