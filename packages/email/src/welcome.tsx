import {
  Html,
  Button,
  Text,
  Head,
  Preview,
  Body,
  Container,
} from "@react-email/components";

export const WelcomeEmail = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Preview>Welcome to Our Platform</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>Welcome {name}!</Text>
        <Text style={text}>
          Thanks for joining our platform. Get started by exploring your dashboard.
        </Text>
        <Button
          href={process.env.FRONTEND_URL}
          style={button}
        >
          Go to Dashboard
        </Button>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue, Helvetica, Arial, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const title = {
  fontSize: "24px",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  marginBottom: "30px",
};

const button = {
  backgroundColor: "#2563eb",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "5px",
  textDecoration: "none",
}; 