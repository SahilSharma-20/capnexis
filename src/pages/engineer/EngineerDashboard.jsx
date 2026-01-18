import {
    Box,
    Tabs,
    Tab,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Divider,
    Chip,
    Snackbar,
    Drawer,
    IconButton,
  } from "@mui/material";
  import UploadFileIcon from "@mui/icons-material/UploadFile";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import { useState } from "react";
  
  /* ---------------- HELPERS ---------------- */
  
  const calcAmount = (qty, rate) =>
    qty && rate ? Number(qty) * Number(rate) : 0;
  
  /* ---------------- COMPONENT ---------------- */
  
  function EngineerDashboard() {
    const [tab, setTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
  
    const [form, setForm] = useState({
      concrete: { qty: "", rate: "", file: null },
      steel: { qty: "", rate: "", file: null },
      cement: { qty: "", rate: "", file: null },
    });
  
    const [pending, setPending] = useState([
      {
        id: "REQ-201",
        date: "12 Jan 2026",
        materials: {
          concrete: { qty: 20, rate: 6000, file: "concrete.jpg" },
          steel: { qty: 5, rate: 55000, file: "steel.pdf" },
          cement: { qty: 300, rate: 380, file: "cement.jpg" },
        },
      },
    ]);
  
    const completed = [
      {
        id: "REQ-180",
        date: "02 Jan 2026",
        status: "Approved",
        materials: {
          concrete: { qty: 15, rate: 6200, file: "rmc.jpg" },
          steel: { qty: 4, rate: 56000, file: "tmt.pdf" },
          cement: { qty: 250, rate: 390, file: "cement2.jpg" },
        },
      },
    ];
  
    const handleChange = (type, field, value) => {
      setForm((prev) => ({
        ...prev,
        [type]: { ...prev[type], [field]: value },
      }));
    };
  
    const handleSubmit = () => {
      setPending((prev) => [
        ...prev,
        {
          id: "REQ-" + Math.floor(Math.random() * 900 + 100),
          date: "Today",
          materials: form,
        },
      ]);
      setSnack(true);
      setTab(1);
    };
  
    const openDetails = (req) => {
      setSelectedRequest(req);
      setDetailsOpen(true);
    };
  
    const renderMaterialRow = (label, data) => (
      <TableRow>
        <TableCell sx={{ fontSize: 16 }}>{label}</TableCell>
        <TableCell sx={{ fontSize: 16 }}>{data.qty}</TableCell>
        <TableCell sx={{ fontSize: 16 }}>₹{data.rate}</TableCell>
        <TableCell sx={{ fontSize: 16 }}>
          ₹{calcAmount(data.qty, data.rate)}
        </TableCell>
        <TableCell sx={{ fontSize: 16 }}>{data.file || "-"}</TableCell>
      </TableRow>
    );
  
    return (
      <Box p={4} bgcolor="#f4f6f8" minHeight="100vh">
        {/* HEADER */}
        <Typography variant="h4" fontWeight="700" mb={3}>
          Site Engineer – Material Management
        </Typography>
  
        {/* TABS */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            sx={{
              "& .MuiTab-root": {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
          >
            <Tab label="Create Bill" />
            <Tab label="Pending Items" />
            <Tab label="Completed" />
          </Tabs>
        </Paper>
  
        {/* CREATE BILL */}
        {tab === 0 && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="800" mb={3}>
              New Material Request (REQ-AUTO)
            </Typography>
  
            {["concrete", "steel", "cement"].map((mat) => (
              <Box key={mat} mb={4}>
                <Typography
                  variant="h6"
                  fontWeight="700"
                  textTransform="capitalize"
                >
                  {mat}
                </Typography>
  
                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Quantity"
                      fullWidth
                      value={form[mat].qty}
                      onChange={(e) =>
                        handleChange(mat, "qty", e.target.value)
                      }
                      InputProps={{ style: { fontSize: 16 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Rate"
                      fullWidth
                      value={form[mat].rate}
                      onChange={(e) =>
                        handleChange(mat, "rate", e.target.value)
                      }
                      InputProps={{ style: { fontSize: 16 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Amount"
                      fullWidth
                      disabled
                      value={calcAmount(form[mat].qty, form[mat].rate)}
                      InputProps={{ style: { fontSize: 16 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      component="label"
                      startIcon={<UploadFileIcon />}
                      variant="outlined"
                      size="large"
                      fullWidth
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        onChange={(e) =>
                          handleChange(mat, "file", e.target.files[0]?.name)
                        }
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
  
            <Divider sx={{ my: 4 }} />
  
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
            >
              Submit for Approval
            </Button>
          </Paper>
        )}
  
        {/* PENDING */}
        {tab === 1 && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="800" mb={3}>
              Pending Approval Requests
            </Typography>
  
            <Table>
              <TableHead>
                <TableRow>
                  {["Request ID", "Date", "Status", "View"].map((h) => (
                    <TableCell key={h} sx={{ fontSize: 16, fontWeight: 700 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pending.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ fontSize: 16 }}>{r.id}</TableCell>
                    <TableCell sx={{ fontSize: 16 }}>{r.date}</TableCell>
                    <TableCell>
                      <Chip label="Pending" color="warning" />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openDetails(r)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
  
        {/* COMPLETED */}
        {tab === 2 && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="800" mb={3}>
              Completed Requests
            </Typography>
  
            <Table>
              <TableHead>
                <TableRow>
                  {["Request ID", "Date", "Status", "View"].map((h) => (
                    <TableCell key={h} sx={{ fontSize: 16, fontWeight: 700 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {completed.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ fontSize: 16 }}>{r.id}</TableCell>
                    <TableCell sx={{ fontSize: 16 }}>{r.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={r.status}
                        color={r.status === "Approved" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openDetails(r)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
  
        {/* DETAILS DRAWER */}
        <Drawer
          anchor="right"
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        >
          {selectedRequest && (
            <Box p={4} width={440}>
              <Typography variant="h5" fontWeight="800" mb={3}>
                Request Details – {selectedRequest.id}
              </Typography>
  
              <Table>
                <TableHead>
                  <TableRow>
                    {["Material", "Qty", "Rate", "Amount", "File"].map((h) => (
                      <TableCell key={h} sx={{ fontSize: 16, fontWeight: 700 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderMaterialRow(
                    "Concrete",
                    selectedRequest.materials.concrete
                  )}
                  {renderMaterialRow(
                    "Steel",
                    selectedRequest.materials.steel
                  )}
                  {renderMaterialRow(
                    "Cement",
                    selectedRequest.materials.cement
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        </Drawer>
  
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={() => setSnack(false)}
          message="Request submitted successfully"
        />
      </Box>
    );
  }
  
  export default EngineerDashboard;
  