// React
import { useState, useEffect } from "react";

// API
import axios from "../../axios";

// MUI
import { Stack, Grid } from "@mui/material";

// MUI-joy
import { Typography, Divider, Card, Alert, Button } from "@mui/joy";
import { Input, CircularProgress } from "@mui/joy";

// MUI-joy Css
import { CssVarsProvider } from "@mui/joy/styles";

// Snackbar
import { useSnackbar } from "notistack";

// MUI Icons
import UserIcon from "@mui/icons-material/Person";
import UserMail from "@mui/icons-material/Mail";

// Components
const Heading = ({ text }) => {
  return <Typography level="h2">{text}</Typography>;
};

const User = () => {
  // States
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
  });

  const [addUserLoading, setAddUserLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAddUser = () => {
    setAddUserLoading(true);
    axios
      .post("/user/add", user)
      .then(async (res) => {
        console.log(res);
        if (res.data.statusCode === 201)
          enqueueSnackbar("User Already Exists!", { variant: "info" });
        if (res.data.statusCode === 200)
          enqueueSnackbar("User Added!", { variant: "success" });
        await handleAllUsers();
        setAddUserLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Some Error Occured", { variant: "error" });
        setAddUserLoading(false);
      });
  };

  const handleUserDetails = () => {
    axios
      .get(`/user/getUser/${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.userEmail === null)
          enqueueSnackbar("User Not Found!", { variant: "error" });
        else {
          setUserDetails(res.data);
          enqueueSnackbar("User Found!", { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured!", { variant: "error" });
        console.log(err.response.data);
      });
  };

  const handleAllUsers = async () => {
    const request = await axios
      .get("/user/get")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    return request;
  };

  useEffect(() => {
    handleAllUsers();
  }, []);

  return (
    <CssVarsProvider>
      <Stack spacing={3} sx={{ padding: "15px 24px" }}>
        <Heading text="Add User & Get User Details" />
        <Divider />
        <Stack direction="row" spacing={2}>
          <Card sx={{ width: 400 }} variant="outlined">
            <Stack spacing={1}>
              <Input
                placeholder="Name"
                name="userName"
                value={user.userName}
                onChange={handleChange}
              />
              <Input
                placeholder="Email"
                name="userEmail"
                value={user.userEmail}
                onChange={handleChange}
              />
              <Button
                variant="soft"
                onClick={handleAddUser}
                loading={addUserLoading}
              >
                Add User
              </Button>
            </Stack>
          </Card>
          <Card sx={{ width: 400 }} variant="outlined">
            <Stack spacing={1}>
              <Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="soft" onClick={handleUserDetails}>
                Get User Details
              </Button>
              <Card sx={{ width: "100%" }} variant="outlined">
                <Stack spacing={1}>
                  <Alert
                    startDecorator={<UserIcon />}
                    variant="soft"
                    color="info"
                    size="sm"
                  >
                    {userDetails.userName}
                  </Alert>
                  <Alert
                    startDecorator={<UserMail />}
                    variant="soft"
                    color="info"
                    size="sm"
                  >
                    {userDetails.userEmail}
                  </Alert>
                </Stack>
              </Card>
            </Stack>
          </Card>
        </Stack>
        <Divider />
        <Heading text="All Users" />
        <Grid container spacing={1}>
          {!usersLoading ? (
            users.map((user) => (
              <Grid item lg={3} md={2} sm={4} xs={6} key={user.userEmail}>
                <Card sx={{ width: 320 }} variant="outlined">
                  <Stack spacing={1}>
                    <Alert
                      startDecorator={<UserIcon />}
                      variant="soft"
                      color="info"
                      size="sm"
                    >
                      {user.userName}
                    </Alert>
                    <Alert
                      startDecorator={<UserMail />}
                      variant="soft"
                      color="info"
                      size="sm"
                    >
                      {user.userEmail}
                    </Alert>
                  </Stack>
                </Card>
              </Grid>
            ))
          ) : (
            <CircularProgress variant="soft" />
          )}
        </Grid>
      </Stack>
    </CssVarsProvider>
  );
};

export default User;
