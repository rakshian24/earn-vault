import { Box, Grid } from "@mui/material";
import { ROUTES } from "../../constants";
import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";

type Props = {};

const StatCards = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Box mt={1}>
      <Grid container spacing={2}>
        <StatCard
          title="Total Earnings"
          description="Lifetime earnings"
          number={4275000}
          handleOnClick={() => navigate(ROUTES.EARNING_HISTORY)}
        />

        <StatCard
          title="Taxes Paid"
          description="Lifetime taxes"
          number={855000}
          handleOnClick={() => navigate(ROUTES.TAX_ANALYSIS)}
        />

        <StatCard
          title="PF Accumulated"
          description="Total PF balance"
          number={632000}
          handleOnClick={() => navigate(ROUTES.PF_DETAILS)}
        />
        <StatCard
          title="Experience"
          description="Total work experience"
          number={5.4}
          handleOnClick={() => navigate(ROUTES.WORK_EXPERIENCE)}
        />
      </Grid>
    </Box>
  );
};

export default StatCards;
