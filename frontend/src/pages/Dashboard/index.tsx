import { Stack, useMediaQuery } from "@mui/material";
import { screenSize } from "../../constants";
import NoData from "./NoData";

type Props = {};

const Dashboard = (props: Props) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack p={isTablet ? 2 : 3}>
      <NoData />
    </Stack>
  );
};

export default Dashboard;
