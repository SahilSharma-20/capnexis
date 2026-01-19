import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GovernanceHub from "./pages/hub/GovernanceHub";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import EnterpriseGovernance from "./pages/enterprise/EnterpriseGovernance";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/governance" element={<GovernanceHub />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/engineer" element={<EngineerDashboard />} />
      <Route path="/finance" element={<FinanceDashboard />} />
      <Route path="/enterprise" element={<EnterpriseGovernance />} />

    </Routes>
  );
}

export default App;
