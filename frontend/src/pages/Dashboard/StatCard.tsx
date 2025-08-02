import { Box, Grid, Stack, Typography } from "@mui/material";
import { colors } from "../../constants";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  title: string;
  handleOnClick: () => void;
  number: number;
  description: string;
};

const StatCard = ({ title, number, handleOnClick, description }: Props) => {
  return (
    <Grid item xs={6} sm={6}>
      <Box
        width="100%"
        bgcolor={colors.white}
        borderRadius={3}
        py={2}
        border={`1px solid ${colors.lightGrey4}`}
        boxShadow="0 1px 2px rgba(0,0,0,0.05)"
      >
        <Stack
          mb={1}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={2}
        >
          <Typography
            fontSize={12}
            fontWeight={500}
            color={colors.contentTertiary}
          >
            {title}
          </Typography>
          <FaChevronRight
            onClick={handleOnClick}
            color={colors.contentSecondary}
          />
        </Stack>
        <Stack gap={0.5} px={2}>
          <Typography fontSize={20} fontWeight={600}>
            {title === "Experience" ? `${number} Years` : number}
          </Typography>
          <Typography fontSize={11} color={colors.contentSecondary}>
            {description}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default StatCard;
