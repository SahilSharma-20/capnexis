import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Layout({ title, children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>

      <Box p={3}>{children}</Box>
    </>
  );
}

export default Layout;
