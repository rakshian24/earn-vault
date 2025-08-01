import { Box, Grid, Stack, Typography } from "@mui/material";
import { colors, ROUTES } from "../../../constants";
import Button from "../../../components/CustomButton";
import { useNavigate } from "react-router-dom";

type NoDataActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  color?: string;
  bgColor?: string;
};

const NoDataActionCard = ({
  icon,
  title,
  description,
  buttonText,
  color = colors.primary,
  bgColor = colors.primaryBg,
}: NoDataActionCardProps) => {
  const navigate = useNavigate();
  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid ${colors.lightGrey3}`}
      bgcolor={colors.white}
      sx={{ boxShadow: "0 1px 2px rgba(229, 231, 235, 0.6)" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box
            px={1.5}
            py={2}
            display={"flex"}
            bgcolor={bgColor}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={2}
          >
            {icon}
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Stack gap={0.5}>
            <Typography fontSize={16} fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Button
              buttonText={buttonText}
              onClick={() => navigate(ROUTES.ADD_COMPANY)}
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor: color,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoDataActionCard;
