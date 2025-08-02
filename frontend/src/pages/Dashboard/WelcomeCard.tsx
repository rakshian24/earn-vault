import { Paper, Stack, Box, Typography, Chip } from "@mui/material";
import { colors, linearGradient } from "../../constants";

type Props = {};

const WelcomeCard = (props: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        background: linearGradient,
        color: "#fff",
        boxShadow: "0 1px 2px rgba(229, 231, 235, 0.6)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="body2" color={colors.lightGrey4} mb={0.5}>
            Welcome back,
          </Typography>
          <Typography color={colors.white} fontWeight={"600"}>
            Rakshith
          </Typography>
          <Typography variant="body2" fontWeight={"500"} mt={1}>
            Senior Software Engineer
          </Typography>
        </Box>
        <Stack gap={0.5} textAlign={"center"}>
          <Chip label="Current employer" sx={{ color: colors.white }} />
          <Typography fontWeight={"600"}>Intuit</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WelcomeCard;
