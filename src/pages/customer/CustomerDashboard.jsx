import {
    Box,
    Grid,
    Paper,
    Typography,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    Fab,
    Drawer,
    Button,
    Avatar,
    Divider,
    Stack,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";
  import ChatIcon from "@mui/icons-material/Chat";
  import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
  import { useState } from "react";
  
  /* ---------------- DATA (NO CHANGE) ---------------- */
  
  const workflowSteps = [
    "Design Finalised",
    "Registration",
    "Foundation Work",
    "Brickwork",
    "Lintel / Roofing",
    "Plumbing & Electrical",
    "Finishing & Painting",
    "Handover",
  ];
  
  const chatQA = {
    "What is my project status?":
      "Foundation work is currently in progress and on track.",
    "Expected completion date?": "December 2026",
    "How much have I paid till now?": "₹5,00,000 paid so far.",
    "Which materials are used currently?":
      "RMC Concrete and Fe500 TMT Steel are being used.",
  };
  
  const emiData = [
    {
      month: "Jan 2026",
      principal: "₹18,000",
      interest: "₹7,500",
      total: "₹25,500",
    },
    {
      month: "Feb 2026",
      principal: "₹18,300",
      interest: "₹7,200",
      total: "₹25,500",
    },
  ];
  
  /* ---------------- COMPONENT ---------------- */
  
  function CustomerDashboard() {
    const [chatOpen, setChatOpen] = useState(false);
    const [emiOpen, setEmiOpen] = useState(false);
    const [visualOpen, setVisualOpen] = useState(false);
    const [selectedVisual, setSelectedVisual] = useState("");
  
    const [messages, setMessages] = useState([
      { from: "bot", text: "Hello 👋 I am Capnexis Agent. How can I help you?" },
    ]);
  
    const handleQuestion = (q) => {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: q },
        { from: "bot", text: chatQA[q] },
      ]);
    };
  
    const openVisual = (title) => {
      setSelectedVisual(title);
      setVisualOpen(true);
    };
  
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* HEADER */}
        <Typography variant="h4" fontWeight="800" mb={4}>
          Hi Jack, Welcome To Tower 101 – Whitefield, Bengaluru
        </Typography>
  
        {/* KPI SECTION – FULL WIDTH */}
        <Grid container spacing={3} mb={5}>
          {[
            { label: "Total Budget", value: "₹35.0 L" },
            { label: "Paid So Far", value: "₹5.0 L" },
            { label: "Remaining", value: "₹34.5 L" },
            { label: "Project Size", value: "1200 sq.ft" },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="800" mt={1}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* OVERALL PROGRESS */}
        <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="800">
            Overall Progress
          </Typography>
  
          <Typography variant="h2" fontWeight="800" mt={2}>
            45%
          </Typography>
  
          <LinearProgress
            variant="determinate"
            value={45}
            sx={{ height: 12, borderRadius: 6, mt: 3 }}
          />
  
          <Typography variant="h6" color="text.secondary" mt={2}>
            Current Stage: Foundation Work
          </Typography>
        </Paper>
  
        {/* CONSTRUCTION WORKFLOW */}
        <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="800" mb={3}>
            Construction Workflow
          </Typography>
  
          <Stepper activeStep={2} orientation="vertical">
            {workflowSteps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h6" fontWeight={index === 2 ? 800 : 500}>
                    {label}
                  </Typography>
                  {index === 2 && (
                    <Typography variant="body1" color="text.secondary">
                      Currently underway. On track for timeline.
                    </Typography>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
  
        {/* PROPERTY VISUALS – ACTIONABLE */}
        <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="800" mb={3}>
            Property Visuals
          </Typography>
  
          <Grid container spacing={3}>
            {[
              "3D Flat Overview",
              "2D Floor Plan",
              "Blueprint",
              "Walkthrough Video",
            ].map((title, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => openVisual(title)}
                >
                  <img
                    src={`https://picsum.photos/300/200?random=${i + 10}`}
                    alt={title}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                  <Typography mt={2} variant="h6" fontWeight="700">
                    {title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
  
        {/* EMI SECTION */}
        <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="800" mb={2}>
            EMI & Loan Details
          </Typography>
  
          <Button
            startIcon={<AccountBalanceIcon />}
            size="large"
            variant="contained"
            onClick={() => setEmiOpen(true)}
          >
            View EMI Schedule
          </Button>
        </Paper>
  
        {/* SITE UPDATES */}
        <Box mb={6}>
          <Typography variant="h5" fontWeight="800" mb={3}>
            Recent Site Updates
          </Typography>
  
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <img
                    src={`https://picsum.photos/400/250?random=${i}`}
                    alt="Site Update"
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                  <Typography variant="h6" mt={2}>
                    Foundation work – Week {i}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* CHAT BUTTON */}
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={() => setChatOpen(true)}
        >
          <ChatIcon />
        </Fab>
  
        {/* PROPERTY VISUAL DRAWER */}
        <Drawer
          anchor="right"
          open={visualOpen}
          onClose={() => setVisualOpen(false)}
        >
          <Box width={420} p={3}>
            <Typography variant="h5" fontWeight="800" mb={2}>
              {selectedVisual}
            </Typography>
  
            <Divider sx={{ mb: 2 }} />
  
            <Typography variant="body1" color="text.secondary">
              This is a dummy preview for <b>{selectedVisual}</b>.  
              Real 3D models, drawings, or videos will be integrated here.
            </Typography>
          </Box>
        </Drawer>
  
        {/* CHAT DRAWER – UNCHANGED */}
        <Drawer anchor="right" open={chatOpen} onClose={() => setChatOpen(false)}>
          <Box width={360} p={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "#1976d2" }}>C</Avatar>
              <Typography fontWeight="bold">Capnexis Agent</Typography>
            </Stack>
  
            <Divider sx={{ my: 2 }} />
  
            <Stack spacing={1} mb={2}>
              {messages.map((m, i) => (
                <Box
                  key={i}
                  alignSelf={m.from === "user" ? "flex-end" : "flex-start"}
                  bgcolor={m.from === "user" ? "#1976d2" : "#e0e0e0"}
                  color={m.from === "user" ? "#fff" : "#000"}
                  p={1.5}
                  borderRadius={2}
                  maxWidth="80%"
                >
                  {m.text}
                </Box>
              ))}
            </Stack>
  
            <Divider sx={{ my: 2 }} />
  
            {Object.keys(chatQA).map((q) => (
              <Button
                key={q}
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => handleQuestion(q)}
              >
                {q}
              </Button>
            ))}
          </Box>
        </Drawer>
  
        {/* EMI DRAWER – UNCHANGED */}
        <Drawer anchor="bottom" open={emiOpen} onClose={() => setEmiOpen(false)}>
          <Box p={3}>
            <Typography variant="h5" fontWeight="800" mb={2}>
              EMI Schedule – HDFC Bank
            </Typography>
  
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Total EMI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emiData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.principal}</TableCell>
                    <TableCell>{row.interest}</TableCell>
                    <TableCell>{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Drawer>
      </Box>
    );
  }
  
  export default CustomerDashboard;
  