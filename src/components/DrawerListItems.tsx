import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
interface DrawerListItemsTypes {
  Link: string;
  Icon: ReactNode;
  Description: string;
}
function DrawerListItems({ Link, Icon, Description }: DrawerListItemsTypes) {
  return (
    <NavLink style={{ textDecoration: "inherit", color: "inherit" }} to={Link}>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>{Icon} </ListItemIcon>
          <ListItemText>{Description}</ListItemText>
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default DrawerListItems;
