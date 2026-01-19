import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
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
          filter: "blur(18px)",
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
          elevation={10}
          sx={{
            p: 4,
            width: 420,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))",
            animation: `${fadeUp} 0.8s ease-out`,
          }}
        >
          {/* LOGO */}
          <Box
  display="flex"
  justifyContent="center"
  mb={0}
>
  <img
    src={capnexisLogo}
    alt="Capnexis Logo"
    style={{
      height: 200,   // 🔥 reduced from 200
      objectFit: "contain",
    }}
  />
</Box>

<Typography
  align="center"
  color="text.secondary"
  fontSize="0.9rem"
  sx={{
    mt: "-28px",   // 🔥 THIS fixes the gap
    mb: 1.5,
  }}
>
  Secure Governance Platform
</Typography>



          <TextField
            fullWidth
            label="Username / Email / Mobile"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Link underline="hover" sx={{ cursor: "pointer" }}>
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/governance")}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
