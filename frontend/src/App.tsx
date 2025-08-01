import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ROUTES, screenSize } from "./constants";
import { useAuth } from "./context/authContext";
import { Stack, useMediaQuery } from "@mui/material";
import Home from "./pages/home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/profile";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import AddCompany from "./pages/AddCompany";
import PfDetails from "./pages/PfDetails";
import WorkExperience from "./pages/WorkExperience";
import TaxAnalysis from "./pages/TaxAnalysis";
import EarningHistory from "./pages/EarningHistory";

function App() {
  const { isLoggedIn } = useAuth();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack sx={{ height: "100vh", minHeight: "100vh", margin: 0 }}>
      {(!isTablet || (isTablet && !isLoggedIn)) && <Header />}
      <Stack
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.REGISTER} element={<Home />}>
            <Route element={<Register />} index />
            <Route element={<Login />} path={ROUTES.LOGIN} />
          </Route>

          {/* Protected Routes wrapped in ProtectedRoute and AppLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.ADD_COMPANY} element={<AddCompany />} />
              <Route path={ROUTES.EARNING_HISTORY} element={<EarningHistory />} />
              <Route path={ROUTES.PF_DETAILS} element={<PfDetails />} />
              <Route
                path={ROUTES.WORK_EXPERIENCE}
                element={<WorkExperience />}
              />
              <Route path={ROUTES.TAX_ANALYSIS} element={<TaxAnalysis />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Stack>
    </Stack>
  );
}

export default App;
