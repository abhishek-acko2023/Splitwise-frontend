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

// Icons
import GroupIcon from "@mui/icons-material/Groups";
import UserIcon from "@mui/icons-material/Person";
import UserMail from "@mui/icons-material/Mail";

// Components
const Heading = ({ text }) => {
  return <Typography level="h2">{text}</Typography>;
};

const Group = () => {
  // States
  const [group, setGroup] = useState({
    groupName: "",
    groupMembers: [],
    groupCreatedBy: "",
  });

  const [addGroupLoading, setAddGroupLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAddGroup = () => {
    setAddGroupLoading(true);
    axios
      .post("/group/create", {
        ...group,
        groupMembers: group.groupMembers
          .trim()
          .split(" ")
          .map((num) => {
            return parseInt(num);
          }),
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.statusCode === 201)
          enqueueSnackbar("Group Already Exists!", { variant: "info" });
        if (res.data.statusCode === 200)
          enqueueSnackbar("Group Added!", { variant: "success" });
        // await handleAllUsers();
        setAddGroupLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Some Error Occured", { variant: "error" });
        setAddGroupLoading(false);
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
    setUsersLoading(true);
    const request = await axios
      .get("/user/get")
      .then((res) => {
        setUsers(res.data);
        setUsersLoading(false);
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
        <Heading text="Add Group & Group Details" />
        <Stack direction="row" spacing={2}>
          <Card sx={{ width: 400 }} variant="outlined">
            <Stack spacing={1}>
              <Input
                placeholder="Group Name"
                name="groupName"
                value={group.groupName}
                onChange={handleChange}
              />
              <Input
                placeholder="Group Creator"
                name="groupCreatedBy"
                value={group.groupCreatedBy}
                onChange={handleChange}
              />
              <Input
                placeholder="Group Members"
                name="groupMembers"
                value={group.groupMembers}
                onChange={handleChange}
              />
              <Button
                variant="soft"
                onClick={handleAddGroup}
                loading={addGroupLoading}
              >
                Add Group
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
      </Stack>
    </CssVarsProvider>
  );
};

export default Group;
