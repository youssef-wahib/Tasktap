import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavBarButtonTypes {
  Link: string;
  Description: string;
}
function NavBarButton({ Link, Description }: NavBarButtonTypes) {
  return (
    <NavLink style={{ textDecoration: "inherit", color: "inherit" }} to={Link}>
      <Button color={"inherit"}>{Description} </Button>
    </NavLink>
  );
}

export default NavBarButton;
