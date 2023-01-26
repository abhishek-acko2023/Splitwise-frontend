// Routing
import { useNavigate } from "react-router-dom";

// MUI
import { AppBar, Toolbar, Stack } from "@mui/material";

// MUI-joy
import { Button, Typography } from "@mui/joy";

// MUI-joy Css
import { CssVarsProvider } from "@mui/joy/styles";

const RouteButton = ({ url, routeName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/" + url);
  };

  return (
    <Button size="sm" onClick={handleClick} variant="soft">
      {routeName}
    </Button>
  );
};

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "rgba(104,79,161,255)" }}>
      <Toolbar>
        <Stack direction="row" spacing={1} alignItems="center">
          <CssVarsProvider>
            <Typography level="h6" sx={{ color: "white" }}>
              Splitwise
            </Typography>
          </CssVarsProvider>
          <img
            src={process.env.PUBLIC_URL + "/images/acko-logo.png"}
            alt="Acko"
            width="70px"
          />
        </Stack>
        <Stack
          sx={{ flexGrow: 1 }}
          direction="row"
          justifyContent="flex-end"
          spacing={3}
        >
          <RouteButton url="" routeName="Home" />
          <RouteButton url="user" routeName="User" />
          <RouteButton url="group" routeName="Group" />
          <RouteButton url="expense" routeName="Expense" />
          <RouteButton url="balance" routeName="Balance" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
