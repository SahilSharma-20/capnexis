import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import ManagementDashboard from "./pages/management/ManagementDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/engineer" element={<EngineerDashboard />} />
      <Route path="/finance" element={<FinanceDashboard />} />
      <Route path="/management" element={<ManagementDashboard />} />
    </Routes>
  );
}

export default App;
