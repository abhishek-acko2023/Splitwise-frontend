// MUI
import { Stack } from "@mui/material";

// MUI-joy
import { Typography, Divider, Card, Alert, IconButton } from "@mui/joy";

// MUI-joy Css
import { CssVarsProvider } from "@mui/joy/styles";

// Icons
import TerminalIcon from "@mui/icons-material/Terminal";
import CopyIcon from "@mui/icons-material/ContentCopy";

// Components
const Heading = ({ text }) => {
  return <Typography level="h2">{text}</Typography>;
};

const Body = ({ text }) => {
  return <Typography level="body1">{text}</Typography>;
};

const Feature = ({ name, imgURL, features = [] }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 200 }}>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" />}
      >
        <Stack spacing={1} alignItems="center">
          <img
            src={process.env.PUBLIC_URL + imgURL}
            alt={name}
            height="55px"
            width="55px"
          />
          <Typography level="h6">{name}</Typography>
        </Stack>
        <Stack spacing={1}>
          {features.map((feature) => (
            <Alert>
              <Typography level="body2">{feature}</Typography>
            </Alert>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

const Technology = ({ type, imgURL, name }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 200 }}>
      <Stack spacing={2}>
        <Typography level="h4">{type}</Typography>
        <Stack spacing={1}>
          <img src={process.env.PUBLIC_URL + imgURL} alt="react" width="55px" />
          <Typography> {name}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

const Code = ({ text }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Alert
      variant="soft"
      size="sm"
      startDecorator={<TerminalIcon />}
      endDecorator={
        <IconButton onClick={handleClick}>
          <CopyIcon />
        </IconButton>
      }
      sx={{ maxWidth: 800 }}
    >
      <Typography level="body3">
        <code>{text}</code>
      </Typography>
    </Alert>
  );
};

const Home = () => {
  return (
    <CssVarsProvider>
      <Stack spacing={3} sx={{ padding: "15px 24px" }}>
        <Heading text="Project" />
        <Body text="A splitwise Demo Web Application built with React and Spring Boot" />
        <Divider />
        <Heading text="Features" />
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Feature
            name="User"
            imgURL="/images/user.png"
            features={["Add New User", "Get All Users", "Get User Details"]}
          />
          <Feature
            name="Group"
            imgURL="/images/team.png"
            features={["Add New Group", "Get All Groups", "Get Group Details"]}
          />
          <Feature
            name="Expense"
            imgURL="/images/expense.png"
            features={[
              "Add New Expense",
              "Get All Expenses",
              "Get Expense Details",
              "Get User Expenses",
              "Get Group Expenses",
            ]}
          />
          <Feature
            name="Split"
            imgURL="/images/bill.png"
            features={[
              "Auto Generated Splits with Expense Addition",
              "Get All Splits",
              "Get Split Details",
              "Get Group Splits",
              "Get User Splits",
              "Settle Split",
            ]}
          />
        </Stack>
        <Divider />
        <Heading text="Technology" />
        <Stack direction="row" spacing={2}>
          <Technology type="Frontend" imgURL="/images/react.png" name="React" />
          <Technology
            type="Backend"
            imgURL="/images/spring-boot.png"
            name="Spring Boot"
          />
        </Stack>
        <Divider />
        <Heading text="Setup & Installation" />
        <Stack spacing={1}>
          <Body text="Frontend" />
          <Code text="git clone https://github.com/abhishek-acko2023/Splitwise-frontend.git" />
          <Code text="cd splitwise-frontend" />
          <Code text="npm install" />
          <Code text="npm start" />
          <Typography level="body2">go to http://localhost:3000</Typography>
          <Divider />
          <Body text="Backend" />
          <Code text="git clone https://github.com/abhishek-acko2023/Splitwise.git" />
          <Code text="cd splitwise" />
          <Code text="ctrl + R (run the backend)" />
          <Typography level="body2">
            Remeber to create a database named <code>Splitwise</code>
          </Typography>
        </Stack>
        <Divider />
        <Heading text="Contributors" />
        <Stack spacing={1}>
          <Typography>Abhishek Singh</Typography>
          <Typography> Anupam Jha</Typography>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
};

export default Home;
