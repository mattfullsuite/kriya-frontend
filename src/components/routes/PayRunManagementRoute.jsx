import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//Pages
import PayRunDashboard from "../../pages/pay-run-management/PayRunDashboard";
import PayRunCreateUpload from "../../pages/pay-run-management/PayRunCreateUpload";
import PayRunReports from "../../pages/pay-run-management/PayRunReports";
import PayRunRequests from "../../pages/pay-run-management/PayRunRequests";
import PayRunSettings from "../../pages/pay-run-management/PayRunSettings";

const PayRunManagemetRoute = (userType) => {
  return (
    <Routes>
      <Route
        path={`/${userType}/hr-management/pay-run-management/`}
        element={<PayRunDashboard />}
      />
      <Route
        path={`/${userType}/hr-management/pay-run-create-upload/`}
        element={<PayRunCreateUpload />}
      />
      <Route
        path={`/${userType}/hr-management/pay-run-reports/`}
        element={<PayRunReports />}
      />
      <Route
        path={`/${userType}/hr-management/pay-run-requests/`}
        element={<PayRunRequests />}
      />
      <Route
        path={`/${userType}/hr-management/pay-run-settings/`}
        element={<PayRunSettings />}
      />
    </Routes>
  );
};

export default PayRunManagemetRoute;
