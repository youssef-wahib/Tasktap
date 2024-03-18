import { Box, Divider, Drawer, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Home, ListAltRounded } from "@mui/icons-material";
import DrawerListItems from "../components/DrawerListItems";
export default function RootPage() {
  return (
    <Stack direction={"row"} spacing={"20%"} sx={{ justifyContent: "center" }}>
      <Drawer variant="permanent">
        <Box sx={{ overflow: "auto" }}>
          <DrawerListItems
            Description={"Home Page"}
            Icon={<Home color={"primary"} />}
            Link={"/"}
          />
          <DrawerListItems
            Description={"View your Projects"}
            Icon={<ListAltRounded color={"primary"} />}
            Link={"Projects"}
          />
          <Divider />
        </Box>
      </Drawer>
      <Outlet />
    </Stack>
  );
}
