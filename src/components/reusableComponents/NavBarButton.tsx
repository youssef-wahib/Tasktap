import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavBarButtonTypes {
  Link: string;
  Description: string;
}
function NavBarButton({ Link, Description }: NavBarButtonTypes) {
  return (
    <NavLink
      style={{
        textDecoration: "inherit",
        color: "inherit",
        margin: "inherit",
      }}
      to={Link}
    >
      <Button
        color={"inherit"}
        sx={{
          "@media (max-width: 430px)": {
            fontSize: "0.5rem",
            mx: "1px",
          },
        }}
      >
        {Description}
      </Button>
    </NavLink>
  );
}

export default NavBarButton;
