import React from "react";
import { Box, Stack, Typography, Paper, useMediaQuery } from "@mui/material";
import { colors, ROUTES, screenSize } from "../../constants";
import { useNavigate } from "react-router-dom";

interface JobEntry {
  company: string;
  role: string;
  period: string;
  salary: string;
  active?: boolean;
}

const jobs: JobEntry[] = [
  {
    company: "TechCorp Inc.",
    role: "Senior Software Engineer",
    period: "2021 – Present",
    salary: "₹24,00,000/yr",
    active: true,
  },
  {
    company: "InnovateSoft",
    role: "Software Engineer",
    period: "2018 – 2021",
    salary: "₹15,00,000/yr",
  },
  {
    company: "CodeNest",
    role: "Junior Developer",
    period: "2016 – 2018",
    salary: "₹7,50,000/yr",
  },
];

const CareerTimeline = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);
  const navigate = useNavigate();

  return (
    <Box mt={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography fontWeight={600}>Career Timeline</Typography>
        <Typography
          fontSize={14}
          fontWeight={"500"}
          color={colors.primary}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(ROUTES.WORK_EXPERIENCE)}
        >
          View All
        </Typography>
      </Stack>

      <Stack spacing={2} position="relative" pl={2}>
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? 57 : isTablet ? 50 : 50,
            left: isMobile ? 24 : isTablet ? 25 : 26,
            bottom: isMobile ? 35 : isTablet ? 35 : 35,
            width: "2px",
            backgroundColor: colors.grey2,
          }}
        />
        {jobs.map((job, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            alignItems="center"
            position="relative"
          >
            <Box
              sx={{
                height: isMobile ? 14 : isTablet ? 15 : 20,
                width: isMobile ? 14 : isTablet ? 15 : 20,
                borderRadius: "50%",
                backgroundColor: job.active ? colors.primary : "#cbd5e1",
                zIndex: 1,
                border: `2px solid ${colors.white}`,
              }}
            />
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                p: 2,
                flexGrow: 1,
                bgcolor: "#fff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={600}>{job.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.role}
                  </Typography>
                </Box>
                <Stack alignItems="flex-end">
                  <Typography variant="body2">{job.period}</Typography>
                  <Typography
                    fontWeight={600}
                    color={job.active ? colors.primary : colors.black}
                    fontSize={14}
                  >
                    {job.salary}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default CareerTimeline;
