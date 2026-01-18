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
          file: "concrete_bill.jpg",
          image: "https://picsum.photos/300/180?random=1",
        },
        steel: {
          qty: 5,
          amount: "₹2,75,000",
          file: "steel_invoice.pdf",
          image: "https://picsum.photos/300/180?random=2",
        },
        cement: {
          qty: 300,
          amount: "₹1,05,000",
          file: "cement_bill.jpg",
          image: "https://picsum.photos/300/180?random=3",
        },
      },
    },
  ];
  
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
  
    /* ---------------- UI ---------------- */
  
    return (
      <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Finance – Approval Management
        </Typography>
  
        {/* TABS */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Pending Approval" />
            <Tab label="Approved / Rejected" />
          </Tabs>
        </Paper>
  
        {/* PENDING TAB */}
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
  
        {/* APPROVED TAB */}
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
  
        {/* DETAILS DRAWER (ANTI-FRAUD CORE) */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {selected && (
            <Box p={3} width={420}>
              <Typography fontWeight="bold" mb={2}>
                Request Details – {selected.id}
              </Typography>
  
              {Object.entries(selected.materials).map(([key, val]) => (
                <Paper sx={{ p: 2, mb: 2 }} key={key}>
                  <Typography fontWeight="bold" textTransform="capitalize" mb={1}>
                    {key}
                  </Typography>
  
                  <Typography variant="body2">
                    Quantity: {val.qty}
                  </Typography>
                  <Typography variant="body2">
                    Amount: {val.amount}
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    Document: {val.file}
                  </Typography>
  
                  <Box
                    component="img"
                    src={val.image}
                    alt={`${key} proof`}
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      border: "1px solid #ddd",
                    }}
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
              required
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
  
        {/* SNACKBAR */}
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
  