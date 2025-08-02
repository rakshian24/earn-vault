import { CSSProperties } from "react";
import {
  InputAdornment,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  CalendarIcon,
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Theme } from "@mui/material/styles";
import { colors, ISO_DATE_FORMAT, screenSize } from "../constants";

type Props = DatePickerProps<Dayjs> & {
  styles?: CSSProperties;
  inputStyles?: CSSProperties;
  placeholder?: string;
  dataTestId?: string;
  error?: boolean;
  popperSx?: SxProps<Theme>;
  minDate?: Dayjs;
  maxDate?: Dayjs;
};

const CustomDatePicker = ({
  styles,
  inputStyles,
  placeholder,
  dataTestId,
  label,
  error,
  popperSx = {},
  minDate,
  maxDate,
  sx,
  ...props
}: Props) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack
      sx={{
        ...(styles && { ...styles }),
        ...sx,
      }}
      gap={"4px"}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format={ISO_DATE_FORMAT}
          minDate={minDate}
          maxDate={maxDate}
          {...props}
          slotProps={{
            ...(popperSx && {
              popper: { sx: popperSx },
            }),
            textField: {
              variant: "filled",
              sx: {
                input: {
                  "&::placeholder": {
                    color: colors.contentTertiary,
                    padding: 0,
                    opacity: 1,
                  },
                  fontSize: isTablet ? 14 : 16,
                },
              },
              inputProps: {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "24px 0 0 24px",
                },
                "data-testid": dataTestId,
              },
              InputProps: {
                ...(placeholder && { placeholder: placeholder }),
                disableUnderline: true,
                sx: {
                  fontSize: "1rem",
                  padding: 0,
                  pr: 2.5,
                  borderRadius: 4,
                  ...(error && { color: colors.red }),
                  backgroundColor: error ? colors.lightRed : colors.grey3,
                  ...(inputStyles && { ...inputStyles }),
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarIcon
                      sx={{ color: colors.grey1, fontSize: isTablet ? 20 : 24 }}
                    />
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </LocalizationProvider>
      <Typography
        sx={{
          px: 2,
          color: error ? colors.red : colors.contentSecondary,
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export default CustomDatePicker;
