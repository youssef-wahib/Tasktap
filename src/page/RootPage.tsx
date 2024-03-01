import {
  AppBar,
  Box,
  Divider,
  Container,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Home, ListAltRounded } from "@mui/icons-material";
import DrawerListItems from "../components/DrawerListItems";
export default function RootPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Todo Project Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <DrawerListItems
              Description={"Home Page"}
              Icon={<Home />}
              Link={"/"}
            />
            <DrawerListItems
              Description={"View your Projects"}
              Icon={<ListAltRounded />}
              Link={"Projects"}
            />
            <Divider />
          </List>
        </Box>
      </Drawer>
      <Container sx={{ p: 3, marginTop: "4rem" }}>
        <Outlet />
      </Container>
    </Box>
  );
}
