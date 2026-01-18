import {
    Box,
    Tabs,
    Tab,
    Paper,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Fab,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Divider,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import ChatIcon from "@mui/icons-material/Chat";
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    LabelList,
  } from "recharts";
  import { useState, useEffect } from "react";
  
  /* ================= DATA ================= */
  
  const KPI = [
    { label: "GMV", value: "₹120 Cr" },
    { label: "Collected", value: "₹78 Cr" },
    { label: "Bank", value: "₹32 Cr" },
    { label: "Pending Bank Amount", value: "₹10 Cr" },
    { label: "Sold", value: "82 / 120" },
  ];
  
  const gmvTrend = [
    { month: "Jan", gmv: 12, cost: 2.5 },
    { month: "Feb", gmv: 20, cost: 3.1 },
    { month: "Mar", gmv: 35, cost: 3.8 },
    { month: "Apr", gmv: 55, cost: 4.2 },
    { month: "May", gmv: 78, cost: 4.9 },
  ];
  
  const forecastGMV = [
    { month: "Jun", gmv: 95 },
    { month: "Jul", gmv: 112 },
    { month: "Aug", gmv: 130 },
  ];
  
  const costSplit = [
    { name: "Material", value: 38 },
    { name: "Labour", value: 22 },
    { name: "Electrical", value: 8 },
    { name: "Plumbing", value: 7 },
    { name: "Others", value: 5 },
  ];
  
  const COLORS = ["#1976d2", "#9c27b0", "#ff9800", "#4caf50", "#607d8b"];
  
  const towersInventory = [
    {
      name: "Tower 101",
      sold: 18,
      total: 25,
      flats: [
        { no: "101-A", size: "1200 sqft", price: "₹85L", status: "Sold" },
        { no: "101-B", size: "1150 sqft", price: "₹82L", status: "Available" },
      ],
    },
    {
      name: "Tower 201",
      sold: 22,
      total: 30,
      flats: [
        { no: "201-A", size: "1100 sqft", price: "₹78L", status: "Sold" },
        { no: "201-B", size: "1080 sqft", price: "₹76L", status: "Available" },
      ],
    },
  ];
  
  const workflow = [
    "Foundation Work",
    "Brickwork",
    "Lintel / Roofing",
    "Plumbing & Electrical",
    "Finishing & Painting",
    "Handover",
  ];
  
  const towersRERA = [
    {
      name: "Tower 101",
      completedTill: 4,
      status: "Currently underway. On track for timeline.",
      images: [1, 2],
    },
    {
      name: "Tower 201",
      completedTill: 1,
      status: "Foundation completed. Brickwork in progress.",
      images: [3, 4],
    },
  ];
  
  const financeData = [
    { id: "REQ-245", site: "Tower 101", amount: "₹5L", date: "15 Jan 2026" },
    { id: "REQ-246", site: "Tower 201", amount: "₹3.8L", date: "18 Jan 2026" },
    { id: "REQ-247", site: "Tower 101", amount: "₹6.4L", date: "22 Jan 2026" },
  ];
  
  /* ================= HELPERS ================= */
  
  const getKpiColor = (label) => {
    if (label.includes("Pending")) return "#d32f2f";
    if (label.includes("Bank")) return "#f9a825";
    return "#2e7d32";
  };
  
  function AnimatedKPI({ value }) {
    // extract number only (120)
    const num = parseInt(value.replace(/\D/g, ""), 10);
  
    // extract suffix only ("Cr")
    const suffix = value.replace(/[₹0-9\s]/g, "");
  
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let current = 0;
      const step = num / 40;
  
      const timer = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        setCount(Math.round(current));
      }, 20);
  
      return () => clearInterval(timer);
    }, [num]);
  
    return (
      <Typography variant="h2" fontWeight="bold">
        ₹{count} {suffix}
      </Typography>
    );
  }
  
  
  /* ================= COMPONENT ================= */
  
  export default function ManagementDashboard() {
    const [tab, setTab] = useState(0);
  
    /* CHATBOT STATE */
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
  
    const handleUserMessage = (q) => {
      setMessages((prev) => [...prev, { from: "user", text: q }]);
      setTyping(true);
  
      setTimeout(() => {
        let response = { text: "Please select a predefined question." };
  
        if (q.toLowerCase().includes("gmv")) {
          response = {
            text:
              "GMV has grown ~22% MoM, primarily driven by Tower 101 conversions.",
            chart: "gmv",
          };
        } else if (q.toLowerCase().includes("delay")) {
          response = {
            text:
              "Tower 201 has a minor execution delay but remains within buffer.",
          };
        } else if (q.toLowerCase().includes("cost")) {
          response = {
            text:
              "Material cost is the highest contributor, accounting for ₹38 Cr.",
            chart: "cost",
          };
        }
  
        setTyping(false);
        setMessages((prev) => [...prev, { from: "bot", ...response }]);
      }, 1200);
    };
  
    const startVoiceInput = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return alert("Voice input not supported");
  
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.start();
  
      recognition.onresult = (e) => {
        handleUserMessage(e.results[0][0].transcript);
      };
    };
  
    return (
      <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Management Dashboard
        </Typography>
  
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Overview" />
            <Tab label="Sales & Inventory" />
            <Tab label="Project Status" />
            <Tab label="Finance Oversight" />
          </Tabs>
        </Paper>
  
        {/* ================= OVERVIEW ================= */}
        {tab === 0 && (
          <>
            <Grid container spacing={3}>
              {KPI.map((k) => (
                <Grid item xs={12} md={6} lg={4} key={k.label}>
                  <Paper sx={{ p: 5, textAlign: "center" }}>
                    <Typography fontSize={18} color={getKpiColor(k.label)}>
                      {k.label}
                    </Typography>
                    {k.label === "Sold" ? (
                      <Typography variant="h2" fontWeight="bold">
                        {k.value}
                      </Typography>
                    ) : (
                      <AnimatedKPI value={k.value} />
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
  
            <Paper sx={{ p: 4, mt: 4 }}>
              <Typography variant="h6" mb={3}>
                GMV vs Cost Trend (₹ Cr)
              </Typography>
              <ResponsiveContainer height={420}>
                <LineChart data={gmvTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="gmv" stroke="#1976d2" strokeWidth={4} />
                  <Line
                    dataKey="cost"
                    stroke="#d32f2f"
                    strokeDasharray="5 5"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
  
            <Paper sx={{ p: 4, mt: 4 }}>
              <Typography variant="h6" mb={3}>
                📉 GMV Forecast (Next 3 Months)
              </Typography>
              <ResponsiveContainer height={300}>
                <BarChart data={forecastGMV}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="gmv" fill="#4caf50">
                    <LabelList dataKey="gmv" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
  
            <Box mt={4} textAlign="right">
              <Button variant="contained" onClick={() => window.print()}>
                📄 Export Board PDF
              </Button>
            </Box>
          </>
        )}
  
        {/* ================= SALES & INVENTORY ================= */}
        {tab === 1 &&
          towersInventory.map((tower) => (
            <Accordion key={tower.name} sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  {tower.name} — {tower.sold}/{tower.total} Sold
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Flat No</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tower.flats.map((f) => (
                      <TableRow key={f.no}>
                        <TableCell>{f.no}</TableCell>
                        <TableCell>{f.size}</TableCell>
                        <TableCell>{f.price}</TableCell>
                        <TableCell>
                          <Chip
                            label={f.status}
                            color={
                              f.status === "Sold" ? "success" : "warning"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))}
  
       {/* ================= PROJECT STATUS ================= */}
{tab === 2 &&
  towersRERA.map((t) => (
    <Accordion key={t.name} sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="bold">
          {t.name} – Construction Workflow
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {/* WORKFLOW STEPS */}
        {workflow.map((step, i) => (
          <Box key={step} mb={2}>
            <Box display="flex" alignItems="center">
              <Box
                width={28}
                height={28}
                borderRadius="50%"
                bgcolor={i <= t.completedTill ? "#1976d2" : "#bdbdbd"}
                color="#fff"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={2}
              >
                {i + 1}
              </Box>

              <Typography
                fontWeight={i === t.completedTill ? "bold" : "normal"}
              >
                {step}
              </Typography>
            </Box>

            {/* CURRENT STAGE STATUS */}
            {i === t.completedTill && (
              <Typography ml={6} variant="body2" color="text.secondary">
                {t.status}
              </Typography>
            )}

            {i < workflow.length - 1 && (
              <Typography ml={2} color="text.secondary">
                ↓
              </Typography>
            )}
          </Box>
        ))}

        {/* SITE IMAGES */}
        <Grid container spacing={2} mt={3}>
          {t.images.map((img) => (
            <Grid item xs={12} md={4} key={img}>
              <img
                src={`https://picsum.photos/400/250?random=${img}`}
                alt="Site Progress"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  ))}

        {/* ================= FINANCE OVERSIGHT ================= */}
        {tab === 3 && (
          <Box>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" mb={3}>
                Monthly Expense Burn (₹ Cr)
              </Typography>
              <ResponsiveContainer height={360}>
                <BarChart data={gmvTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#1976d2">
                    <LabelList dataKey="cost" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
  
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" mb={3}>
                Cost Burn Distribution (₹ Cr)
              </Typography>
              <ResponsiveContainer height={420}>
                <PieChart>
                  <Pie
                    data={costSplit}
                    dataKey="value"
                    innerRadius={80}
                    outerRadius={150}
                    label={({ name, value }) =>
                      `${name} – ₹${value} Cr`
                    }
                  >
                    {costSplit.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v} Cr`} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        )}
  
        {/* ================= CHATBOT (ALL TABS) ================= */}
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => setChatOpen(true)}
        >
          <ChatIcon />
        </Fab>
  
        <Drawer
          anchor="right"
          open={chatOpen}
          onClose={() => setChatOpen(false)}
        >
          <Box
            width={380}
            height="100%"
            display="flex"
            flexDirection="column"
            p={2}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Box
                width={36}
                height={36}
                borderRadius="50%"
                bgcolor="#1976d2"
                color="#fff"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                mr={1.5}
              >
                AI
              </Box>
              <Typography fontWeight="bold" fontSize={18}>
                Capnexis AI Agent
              </Typography>
            </Box>
  
            <Divider sx={{ mb: 2 }} />
  
            <Box flex={1} overflow="auto" display="flex" flexDirection="column" gap={1.5}>
              {messages.length === 0 && (
                <Typography color="text.secondary" textAlign="center">
                  Ask me about GMV, delays, or cost risks.
                </Typography>
              )}
  
              {messages.map((m, i) => (
                <Box
                  key={i}
                  alignSelf={m.from === "user" ? "flex-end" : "flex-start"}
                  bgcolor={m.from === "user" ? "#1976d2" : "#f1f3f4"}
                  color={m.from === "user" ? "#fff" : "#000"}
                  p={2}
                  borderRadius={2}
                  maxWidth="85%"
                >
                  {m.text}
  
                  {m.chart === "gmv" && (
                    <ResponsiveContainer height={150}>
                      <LineChart data={gmvTrend}>
                        <Line dataKey="gmv" stroke="#1976d2" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
  
                  {m.chart === "cost" && (
                    <ResponsiveContainer height={150}>
                      <PieChart>
                        <Pie data={costSplit} dataKey="value" outerRadius={60}>
                          {costSplit.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              ))}
  
              {typing && (
                <Typography color="text.secondary">
                  Capnexis Agent is thinking…
                </Typography>
              )}
            </Box>
  
            <Divider sx={{ my: 2 }} />
  
            <Button fullWidth variant="contained" onClick={startVoiceInput}>
              🎙️ Ask via Voice
            </Button>
  
            <List>
              {[
                "What is total GMV?",
                "Any delay risk?",
                "Where is highest cost burn?",
              ].map((q) => (
                <ListItem key={q} disablePadding>
                  <ListItemButton onClick={() => handleUserMessage(q)}>
                    <ListItemText primary={q} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  }
  