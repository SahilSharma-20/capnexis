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
  Switch,
  FormControlLabel,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";

/* ======================================================
   HELPERS
====================================================== */
const now = () => new Date().toLocaleString();

/* ======================================================
   COMPONENT
====================================================== */
function EngineerDashboard() {
  const [tab, setTab] = useState(0);
  const [snack, setSnack] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  /* ================= CREATE FORM ================= */
  const [form, setForm] = useState({
    material: "Concrete",
    vehicle: "",
    supplier: "",
    quantity: "",
    grn: "",
    discrepancy: false,
    discrepancyNote: "",
  });

  /* ================= CAMERA STATE ================= */
  const [capture, setCapture] = useState({
    photo: null,
    preview: null,
    location: "",
    timestamp: "",
  });

  /* ================= ORIGINAL DUMMY DATA (RESTORED) ================= */
  const [pending, setPending] = useState([
    {
      id: "REQ-201",
      date: "12 Jan 2026",
      status: "Pending",
      material: "Steel",
      vehicle: "MH12 AB 2234",
      supplier: "ABC Steels",
      quantity: "5 MT",
      grn: "GRN-8892",
      discrepancy: true,
      discrepancyNote: "Weight mismatch observed",
    },
  ]);

  const completed = [
    {
      id: "REQ-180",
      date: "02 Jan 2026",
      status: "Approved",
      material: "Cement",
      vehicle: "MH14 ZY 9021",
      supplier: "Ultra Cement",
      quantity: "250 Bags",
      grn: "GRN-7721",
      discrepancy: false,
    },
  ];

  /* ================= HANDLERS ================= */
  const handleFormChange = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleCameraCapture = (file) => {
    if (!file) return;

    const time = new Date().toLocaleString();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = `${pos.coords.latitude.toFixed(
          5
        )}, ${pos.coords.longitude.toFixed(5)}`;

        setCapture({
          photo: file,
          preview: URL.createObjectURL(file),
          location: loc,
          timestamp: time,
        });
      },
      () => {
        setCapture({
          photo: file,
          preview: URL.createObjectURL(file),
          location: "Location permission denied",
          timestamp: time,
        });
      }
    );
  };

  const handleSubmit = () => {
    setPending((p) => [
      ...p,
      {
        id: "REQ-" + Math.floor(Math.random() * 900 + 100),
        date: "Today",
        status: "Pending",
        ...form,
        evidence: capture,
      },
    ]);

    setSnack(true);
    setTab(1);

    // reset form (state-only)
    setForm({
      material: "Concrete",
      vehicle: "",
      supplier: "",
      quantity: "",
      grn: "",
      discrepancy: false,
      discrepancyNote: "",
    });

    setCapture({
      photo: null,
      preview: null,
      location: "",
      timestamp: "",
    });
  };

  const openDetails = (req) => {
    setSelectedRequest(req);
    setDetailsOpen(true);
  };

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <Box p={4} bgcolor="#f4f6f8" minHeight="100vh">
      <Typography variant="h4" fontWeight={600} mb={2}>
        Operational Management Governance
      </Typography>

      {/* ================= TABS ================= */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Create Gate-In" />
          <Tab label="Pending Items" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>

      {/* ================= CREATE GATE-IN ================= */}
      {tab === 0 && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={700} mb={3}>
            Material Gate-In Request
          </Typography>

          {/* MATERIAL SELECT */}
          <Box mb={3}>
            {["Concrete", "Steel", "Cement"].map((m) => (
              <Chip
                key={m}
                label={m}
                clickable
                color={form.material === m ? "primary" : "default"}
                onClick={() => handleFormChange("material", m)}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Vehicle Number"
                fullWidth
                value={form.vehicle}
                onChange={(e) =>
                  handleFormChange("vehicle", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Supplier Name"
                fullWidth
                value={form.supplier}
                onChange={(e) =>
                  handleFormChange("supplier", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Quantity Received"
                fullWidth
                value={form.quantity}
                onChange={(e) =>
                  handleFormChange("quantity", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="GRN / Challan No"
                fullWidth
                value={form.grn}
                onChange={(e) =>
                  handleFormChange("grn", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Date & Time"
                fullWidth
                disabled
                value={now()}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <FormControlLabel
            control={
              <Switch
                checked={form.discrepancy}
                onChange={(e) =>
                  handleFormChange("discrepancy", e.target.checked)
                }
              />
            }
            label="Discrepancy Found"
          />

          {form.discrepancy && (
            <TextField
              label="Discrepancy Details"
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={form.discrepancyNote}
              onChange={(e) =>
                handleFormChange("discrepancyNote", e.target.value)
              }
            />
          )}

          <Divider sx={{ my: 3 }} />

          {/* EVIDENCE */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                component="label"
                fullWidth
                variant="outlined"
                startIcon={<UploadFileIcon />}
              >
                Upload Evidence Photo
                <input hidden type="file" accept="image/*" />
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                component="label"
                fullWidth
                variant="contained"
                startIcon={<CameraAltIcon />}
              >
                Capture Live Photo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) =>
                    handleCameraCapture(e.target.files[0])
                  }
                />
              </Button>
            </Grid>
          </Grid>

          {capture.preview && (
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography fontWeight={600} mb={1}>
                Captured Evidence
              </Typography>

              <img
                src={capture.preview}
                alt="Captured"
                style={{ width: "100%", borderRadius: 8 }}
              />

              <Typography variant="body2">
                🕒 {capture.timestamp}
              </Typography>
              <Typography variant="body2">
                📍 {capture.location}
              </Typography>
            </Paper>
          )}

          <Divider sx={{ my: 3 }} />

          <Button variant="contained" size="large" onClick={handleSubmit}>
            Submit for Finance Approval
          </Button>
        </Paper>
      )}

      {/* ================= PENDING ================= */}
      {tab === 1 && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={800} mb={3}>
            Pending Approval Requests
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                {["Request ID", "Date", "Status", "View"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pending.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.date}</TableCell>
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

      {/* ================= COMPLETED ================= */}
      {tab === 2 && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={800} mb={3}>
            Completed Requests
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                {["Request ID", "Date", "Status", "View"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {completed.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>
                    <Chip label={r.status} color="success" />
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

      {/* ================= DRAWER ================= */}
      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      >
        {selectedRequest && (
          <Box p={4} width={420}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              Request Details
            </Typography>

            {Object.entries(selectedRequest).map(
              ([k, v]) =>
                typeof v === "string" && (
                  <Typography key={k}>
                    {k}: {v}
                  </Typography>
                )
            )}

            {selectedRequest.evidence?.preview && (
              <>
                <Divider sx={{ my: 2 }} />
                <img
                  src={selectedRequest.evidence.preview}
                  alt="Evidence"
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography variant="caption">
                  🕒 {selectedRequest.evidence.timestamp}
                </Typography>
                <Typography variant="caption">
                  📍 {selectedRequest.evidence.location}
                </Typography>
              </>
            )}

            {selectedRequest.discrepancy && (
              <Chip
                label="Discrepancy Flagged"
                color="error"
                sx={{ mt: 2 }}
              />
            )}
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
