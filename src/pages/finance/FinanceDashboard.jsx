import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

/* ---------------- MOCK DATA ---------------- */

const initialPending = [
  {
    id: "REQ-245",
    date: "15 Jan 2026",
    engineer: "Ramesh",
    total: "₹5,00,000",
    materials: {
      concrete: {
        qty: 20,
        amount: "₹1,20,000",
        image: "https://picsum.photos/300/180?random=1",
      },
      steel: {
        qty: 5,
        amount: "₹2,75,000",
        image: "https://picsum.photos/300/180?random=2",
      },
      cement: {
        qty: 300,
        amount: "₹1,05,000",
        image: "https://picsum.photos/300/180?random=3",
      },
    },
  },
];

/* ---------------- GOVERNANCE STATUS ---------------- */

const commitmentGovernance = [
  {
    text: "Approved project budget uploaded and version-controlled",
    status: "ok",
  },
  {
    text: "Budget linked to contract packages and BOQs",
    status: "ok",
  },
  {
    text: "Change orders require documented approval",
    status: "attention",
  },
  {
    text: "Budget revisions tracked with justification and authority",
    status: "ok",
  },
  {
    text: "Financial commitments visible vs approved budget",
    status: "ok",
  },
  {
    text: "Contract value does not exceed sanctioned limits",
    status: "ok",
  },
  {
    text: "Unauthorized scope detected in recent request",
    status: "critical",
  },
];

const contractGovernance = [
  {
    text: "Valid contract exists for every payment",
    status: "ok",
  },
];

/* ---------------- HELPERS ---------------- */

const statusStyle = (status) => {
  if (status === "ok")
    return { label: "OK", color: "#2e7d32" };
  if (status === "attention")
    return { label: "Attention Required", color: "#ed6c02" };
  return { label: "Critical Issue", color: "#d32f2f" };
};

/* ---------------- COMPONENT ---------------- */

function FinanceDashboard() {
  const [tab, setTab] = useState(0);
  const [pending, setPending] = useState(initialPending);
  const [approved, setApproved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [snack, setSnack] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const openDetails = (req) => {
    setSelected(req);
    setDrawerOpen(true);
  };

  const openAction = (type, req) => {
    setActionType(type);
    setSelected(req);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    const updated = {
      ...selected,
      status: actionType,
      remarks,
      approver: "Finance Manager",
    };

    setApproved((prev) => [...prev, updated]);
    setPending((prev) => prev.filter((r) => r.id !== selected.id));

    setDialogOpen(false);
    setRemarks("");
    setSnack(`Request ${actionType} successfully`);
  };

  return (
    <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
      <Typography variant="h5" fontWeight="600" mb={2}>
        Finance – Approval & Governance
      </Typography>

      {/* TABS */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Pending Approval" />
          <Tab label="Approved / Rejected" />
          <Tab label="Finance Governance" />
        </Tabs>
      </Paper>

      {/* ================= PENDING APPROVAL ================= */}
      {tab === 0 && (
        <Paper sx={{ p: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Site Engineer</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pending.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.engineer}</TableCell>
                  <TableCell>{r.total}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openDetails(r)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => openAction("Approved", r)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      sx={{ ml: 1 }}
                      onClick={() => openAction("Rejected", r)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ================= APPROVED / REJECTED ================= */}
      {tab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Approved By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approved.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>
                    <Chip
                      label={r.status}
                      color={r.status === "Approved" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{r.remarks}</TableCell>
                  <TableCell>{r.approver}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ================= FINANCE GOVERNANCE ================= */}
      {tab === 2 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>
              1) Commitment and Budget Governance
            </Typography>

            {commitmentGovernance.map((item, i) => {
              const s = statusStyle(item.status);
              return (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                  p={1.5}
                  bgcolor="#fff"
                  borderRadius={1}
                >
                  <Typography>{item.text}</Typography>
                  <Typography fontWeight="600" sx={{ color: s.color }}>
                    {s.label}
                  </Typography>
                </Box>
              );
            })}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              2) Contract and Rate Governance
            </Typography>

            {contractGovernance.map((item, i) => {
              const s = statusStyle(item.status);
              return (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                  p={1.5}
                  bgcolor="#fff"
                  borderRadius={1}
                >
                  <Typography>{item.text}</Typography>
                  <Typography fontWeight="600" sx={{ color: s.color }}>
                    {s.label}
                  </Typography>
                </Box>
              );
            })}
          </Paper>
        </Box>
      )}

      {/* DETAILS DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selected && (
          <Box p={3} width={420}>
            <Typography fontWeight="600" mb={2}>
              Request Details – {selected.id}
            </Typography>

            {Object.entries(selected.materials).map(([key, val]) => (
              <Paper sx={{ p: 2, mb: 2 }} key={key}>
                <Typography fontWeight="600">{key}</Typography>
                <Typography>Quantity: {val.qty}</Typography>
                <Typography>Amount: {val.amount}</Typography>
                <Box
                  component="img"
                  src={val.image}
                  sx={{ width: "100%", mt: 1, borderRadius: 1 }}
                />
              </Paper>
            ))}
          </Box>
        )}
      </Drawer>

      {/* APPROVE / REJECT DIALOG */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{actionType} Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Remarks"
            fullWidth
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!remarks}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3000}
        onClose={() => setSnack("")}
        message={snack}
      />
    </Box>
  );
}

export default FinanceDashboard;
