import {
  Box,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { colors, ISO_DATE_FORMAT2, ROUTES, screenSize } from "../../constants";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_COMPANY_OR_SALARY_UPDATE } from "../../graphql/mutations";
import {
  IAddCompanyOrSalaryFormValueTypes,
  InitAddCompanyOrSalaryFormValues,
} from "./helper";
import {
  CompanySize,
  CompanyType,
  EmploymentType,
  GrowthType,
  Industry,
  WorkMode,
} from "../../types";
import { AddOutlined, BusinessCenterOutlined } from "@mui/icons-material";
import { AiOutlineRise } from "react-icons/ai";
import {
  companyTypeLabels,
  employmentTypeLabels,
  formatNumber,
  growthTypeLabels,
  industryLabels,
  textInputRegex,
  workModeLabels,
} from "../../utils";
import { useNavigate } from "react-router-dom";
import Button from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomDatePicker from "../../components/CustomDatePicker";
import { Dayjs } from "dayjs";
import { FaRupeeSign } from "react-icons/fa";
import ErrorBox from "../../components/ErrorBox";
import { BsBuildings } from "react-icons/bs";

type Props = {};

const AddCompany = (props: Props) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>();
  const [toDate, setToDate] = useState<Dayjs | null>();

  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { control, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: { ...InitAddCompanyOrSalaryFormValues },
    mode: "onChange",
  });

  const [addCompanyOrSalaryUpdate, { loading: isAddCompanyOrSalaryUpdate }] =
    useMutation(ADD_COMPANY_OR_SALARY_UPDATE);

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };

  const onSubmitHandler = async (
    formValues: IAddCompanyOrSalaryFormValueTypes
  ) => {
    setIsLoading(true);

    try {
      const { data } = await addCompanyOrSalaryUpdate({
        variables: {
          input: {
            ...formValues,
            fromDate: fromDate && fromDate.format(ISO_DATE_FORMAT2),
            toDate: toDate && toDate.format(ISO_DATE_FORMAT2),
          },
        },
      });

      if (data?.addMedication?._id) {
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error) {
      console.error("Error while adding company/salary: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const enteredBaseSalary = watch("baseSalary");
  const enteredBonus = watch("bonus");
  const enteredStocks = watch("stocks");

  const totalCtc =
    Number(enteredBaseSalary) + Number(enteredBonus) + Number(enteredStocks);

  const handleCancel = () => {
    reset({ ...InitAddCompanyOrSalaryFormValues });
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Stack
      mt={1}
      p={2}
      gap={isTablet ? 2 : 3}
      component={"form"}
      noValidate
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Stack
        bgcolor={colors.white}
        borderRadius={3}
        p={2}
        gap={1.5}
        boxShadow="0 1px 2px rgba(0,0,0,0.04)"
        border={`1px solid ${colors.lightGrey4}`}
      >
        <Typography fontSize={16} fontWeight={500}>
          What would you like to add?
        </Typography>
        <Controller
          name="growthType"
          {...COMMON_PROPS}
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Stack gap={1}>
              <Stack direction="row" gap={2}>
                {Object.values(GrowthType).map((type) => {
                  const isSelected = field.value === type;

                  return (
                    <Box
                      key={type}
                      onClick={() => field.onChange(type)}
                      sx={{
                        flex: 1,
                        px: isMobile ? 1 : isTablet ? 2 : 2,
                        py: 2,
                        borderRadius: 4,
                        textAlign: "center",
                        border: `2px solid ${
                          isSelected ? colors.primary : "#E0E0E0"
                        }`,
                        backgroundColor: isSelected ? colors.primaryBg : "#FFF",
                        color: isSelected ? colors.primary : "#757575",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      <Box mb={0.25}>
                        {type === GrowthType.COMPANY ? (
                          <BsBuildings style={{ fontSize: "28px" }} />
                        ) : (
                          <AiOutlineRise style={{ fontSize: "28px" }} />
                        )}
                      </Box>
                      <Stack gap={0.5}>
                        <Typography
                          fontWeight={600}
                          fontSize={isTablet ? 14 : 16}
                        >
                          {growthTypeLabels[type].title}
                        </Typography>
                        <Typography
                          fontWeight={500}
                          fontSize={isMobile ? 11 : isTablet ? 12 : 14}
                          color={colors.contentSecondary}
                        >
                          {growthTypeLabels[type].description}
                        </Typography>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          )}
        />
      </Stack>

      {/* Company Information */}
      <Stack
        bgcolor={colors.white}
        borderRadius={3}
        p={2}
        gap={1.5}
        boxShadow="0 1px 2px rgba(0,0,0,0.04)"
        border={`1px solid ${colors.lightGrey4}`}
      >
        <Typography fontSize={16} fontWeight={500} mb={1}>
          Company Details
        </Typography>
        <Stack direction={isTablet ? "column" : "row"} gap={isTablet ? 2 : 3}>
          <Controller
            name="companyName"
            {...COMMON_PROPS}
            rules={{
              required: true,
              pattern: {
                value: textInputRegex,
                message: "Invalid characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomInput
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder="Enter company name"
                label="Company name"
              />
            )}
          />
          <Controller
            name="industry"
            {...COMMON_PROPS}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder={"Select industry"}
                label={"Industry"}
                defaultValue={field.value}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  field.onChange(e.target.value);
                }}
              >
                {Object.values(Industry).map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industryLabels[industry]}
                  </MenuItem>
                ))}
              </CustomSelect>
            )}
          />
        </Stack>

        <Stack direction={isTablet ? "column" : "row"} gap={isTablet ? 2 : 3}>
          <Controller
            name="companySize"
            {...COMMON_PROPS}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder={"Select size"}
                label={"Company size"}
                defaultValue={field.value}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  field.onChange(e.target.value);
                }}
              >
                {Object.values(CompanySize).map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </CustomSelect>
            )}
          />
          <Controller
            name="companyType"
            {...COMMON_PROPS}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder={"Select company type"}
                label={"Company type"}
                defaultValue={field.value}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  field.onChange(e.target.value);
                }}
              >
                {Object.values(CompanyType).map((companyType) => (
                  <MenuItem key={companyType} value={companyType}>
                    {companyTypeLabels[companyType]}
                  </MenuItem>
                ))}
              </CustomSelect>
            )}
          />
        </Stack>
      </Stack>

      {/* Role Information */}
      <Stack
        bgcolor={colors.white}
        borderRadius={3}
        p={2}
        gap={1.5}
        boxShadow="0 1px 2px rgba(0,0,0,0.04)"
        border={`1px solid ${colors.lightGrey4}`}
      >
        <Typography fontSize={16} fontWeight={500} mb={1}>
          Role Information
        </Typography>
        <Stack direction={isTablet ? "column" : "row"} gap={isTablet ? 2 : 3}>
          <Controller
            name="jobTitle"
            {...COMMON_PROPS}
            rules={{
              required: true,
              pattern: {
                value: textInputRegex,
                message: "Invalid characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomInput
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder="e.g. Senior Software Engineer"
                label="Job title"
              />
            )}
          />
          <Controller
            name="department"
            {...COMMON_PROPS}
            rules={{
              required: true,
              pattern: {
                value: textInputRegex,
                message: "Invalid characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomInput
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder="e.g. Engineering, Marketing"
                label="Department"
              />
            )}
          />
        </Stack>

        <Stack direction={isTablet ? "column" : "row"} gap={isTablet ? 2 : 3}>
          <Controller
            name="employmentType"
            {...COMMON_PROPS}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder={"Select employment type"}
                label={"Employment type"}
                defaultValue={field.value}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  field.onChange(e.target.value);
                }}
              >
                {Object.values(EmploymentType).map((employmentType) => (
                  <MenuItem key={employmentType} value={employmentType}>
                    {employmentTypeLabels[employmentType]}
                  </MenuItem>
                ))}
              </CustomSelect>
            )}
          />
          <Controller
            name="workMode"
            {...COMMON_PROPS}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                {...field}
                error={error !== undefined}
                styles={{ width: "100%" }}
                placeholder={"Select work mode"}
                label={"Work mode"}
                defaultValue={field.value}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  field.onChange(e.target.value);
                }}
              >
                {Object.values(WorkMode).map((workMode) => (
                  <MenuItem key={workMode} value={workMode}>
                    {workModeLabels[workMode]}
                  </MenuItem>
                ))}
              </CustomSelect>
            )}
          />
        </Stack>
        <Controller
          name="location"
          {...COMMON_PROPS}
          rules={{
            required: true,
            pattern: {
              value: textInputRegex,
              message: "Invalid characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              error={error !== undefined}
              styles={{ width: "100%" }}
              placeholder="e.g. Bengaluru, India"
              label="Job location"
            />
          )}
        />
      </Stack>

      {/* Duration */}
      <Stack
        bgcolor={colors.white}
        borderRadius={3}
        p={2}
        gap={1.5}
        boxShadow="0 1px 2px rgba(0,0,0,0.04)"
        border={`1px solid ${colors.lightGrey4}`}
      >
        <Typography fontSize={16} fontWeight={500} mb={1}>
          Duration
        </Typography>
        <Stack direction={isTablet ? "column" : "row"} gap={2}>
          <CustomDatePicker
            label="From date"
            value={fromDate}
            onChange={setFromDate}
            disableFuture
            maxDate={toDate || undefined}
            sx={{ width: "100%" }}
          />
          <CustomDatePicker
            label="To date"
            value={toDate}
            onChange={setToDate}
            disableFuture
            minDate={fromDate || undefined}
            sx={{ width: "100%" }}
          />
        </Stack>
      </Stack>

      {/* Compensation Details */}
      <Stack
        bgcolor={colors.white}
        borderRadius={3}
        p={2}
        gap={1.5}
        boxShadow="0 1px 2px rgba(0,0,0,0.04)"
        border={`1px solid ${colors.lightGrey4}`}
      >
        <Typography fontSize={16} fontWeight={500} mb={1}>
          Compensation Details
        </Typography>
        <Controller
          name="baseSalary"
          {...COMMON_PROPS}
          rules={{
            required: true,
            pattern: {
              value: textInputRegex,
              message: "Invalid characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              value={typeof field.value === "string" ? field.value : ""}
              error={!!error}
              styles={{ width: "100%" }}
              placeholder="1000000"
              label="Base salary"
              startIcon={<FaRupeeSign />}
            />
          )}
        />
        <Stack direction={isTablet ? "column" : "row"} gap={isTablet ? 2 : 3}>
          <Controller
            name="bonus"
            {...COMMON_PROPS}
            rules={{
              pattern: {
                value: textInputRegex,
                message: "Invalid characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomInput
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                error={!!error}
                styles={{ width: "100%" }}
                placeholder="500000"
                label="Bonus/Variable"
                startIcon={<FaRupeeSign />}
              />
            )}
          />
          <Controller
            name="stocks"
            {...COMMON_PROPS}
            rules={{
              pattern: {
                value: textInputRegex,
                message: "Invalid characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomInput
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                error={!!error}
                styles={{ width: "100%" }}
                placeholder="300000"
                label="Stocks/ESOPs"
                startIcon={<FaRupeeSign />}
              />
            )}
          />
        </Stack>
        {totalCtc > 0 && (
          <Stack
            bgcolor={colors.lightGrey1}
            borderRadius={2}
            padding={2}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>Total CTC</Typography>
            <Typography>{formatNumber(totalCtc)}</Typography>
          </Stack>
        )}
      </Stack>

      <ErrorBox formState={formState} />

      {/* Submit Button */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={isTablet ? 2 : 3}
        ml={"auto"}
      >
        <Button
          buttonText={"Cancel"}
          isLoading={isLoading || isAddCompanyOrSalaryUpdate}
          onClick={handleCancel}
          priority="secondary"
        />
        <Button
          startIcon={<AddOutlined />}
          buttonText={"Save"}
          isLoading={isLoading || isAddCompanyOrSalaryUpdate}
          onClick={() => onSubmitHandler}
        />
      </Stack>
    </Stack>
  );
};

export default AddCompany;
