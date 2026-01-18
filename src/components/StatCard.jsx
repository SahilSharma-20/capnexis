import { Paper, Typography } from "@mui/material";

function StatCard({ label, value }) {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}

export default StatCard;
