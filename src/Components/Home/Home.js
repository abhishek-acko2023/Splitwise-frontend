// MUI
import { Stack } from "@mui/material";

// MUI-joy
import { Typography, Divider, Card, Alert } from "@mui/joy";

// MUI-joy Css
import { CssVarsProvider } from "@mui/joy/styles";

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
      </Stack>
    </CssVarsProvider>
  );
};

export default Home;
