import { useNavigate } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import { keyframes } from "@mui/system";
import capnexisLogo from "../assets/logo/capnexis-logo.png";

/* ---------------- ANIMATION ---------------- */

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function Login() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501183638710-841dd1904471)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          zIndex: 1,
        }}
      />

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.55)",
          zIndex: 2,
        }}
      />

      {/* LOGIN CARD */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        position="relative"
        zIndex={3}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            width: 420,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
            animation: `${fadeUp} 0.8s ease-out`,
          }}
        >
          {/* LOGO ONLY (BIGGER) */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <img
              src={capnexisLogo}
              alt="Capnexis Logo"
              style={{
                height: 120,   // 👈 BIG & CLEAR
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => navigate("/customer")}
          >
            Customer
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => navigate("/engineer")}
          >
            Site Engineer
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => navigate("/finance")}
          >
            Finance Team
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/management")}
          >
            Management / Board
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
