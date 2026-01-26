import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ===== ICONS ===== */
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

/* ===== LOGO ===== */
import capnexisLogo from "../../assets/logo/capnexis-logo.png";

function GovernanceHub() {
  const navigate = useNavigate();

  const tiles = [
    {
      title: "Enterprise Executive Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "/enterprise-dashboard",
    },
    {
      title: "Enterprise Level Governance",
      icon: <ApartmentIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "/enterprise",
    },
    {
      title: "Operational Management Governance",
      icon: <EngineeringIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "/engineer",
    },
    {
      title: "Supplier Management Governance",
      icon: <LocalShippingIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "#",
    },
    {
      title: "Finance Management Governance",
      icon: <AccountBalanceIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "/finance",
    },
    {
      title: "Customer Management Governance",
      icon: <PeopleAltIcon sx={{ fontSize: 36, color: "#4CAF50" }} />,
      path: "/customer",
    },
  ];

  return (
    <Box minHeight="100vh" bgcolor="#ffffff">
      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          height: 220,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1560185127-6ed189bf02f4)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />

        {/* LOGO */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={capnexisLogo}
            alt="Capnexis"
            style={{
              height: 250,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
            }}
          />
        </Box>
      </Box>

      {/* ================= GOVERNANCE AREA ================= */}
      <Box px={5} py={4}>
        <Box sx={{ maxWidth: "1100px" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#f57c00"
            mb={3}
          >
            Governance Areas
          </Typography>

          {/* GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 260px)",
              columnGap: "20px",
              rowGap: "20px",
            }}
          >
            {tiles.map((tile) => (
              <Paper
                key={tile.title}
                elevation={1}
                onClick={() => tile.path !== "#" && navigate(tile.path)}
                sx={{
                  height: 130,
                  width: 260,
                  borderRadius: 4,
                  backgroundColor: "#f1f1f1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: tile.path !== "#" ? "pointer" : "default",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {tile.icon}
                <Typography
                  align="center"
                  fontSize="0.9rem"
                  fontWeight={600}
                >
                  {tile.title}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GovernanceHub;
