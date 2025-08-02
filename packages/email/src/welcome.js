"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeEmail = void 0;
const components_1 = require("@react-email/components");
const WelcomeEmail = ({ name }) => (<components_1.Html>
    <components_1.Head />
    <components_1.Preview>Welcome to Our Platform</components_1.Preview>
    <components_1.Body style={main}>
      <components_1.Container style={container}>
        <components_1.Text style={title}>Welcome {name}!</components_1.Text>
        <components_1.Text style={text}>
          Thanks for joining our platform. Get started by exploring your dashboard.
        </components_1.Text>
        <components_1.Button href={process.env.FRONTEND_URL} style={button}>
          Go to Dashboard
        </components_1.Button>
      </components_1.Container>
    </components_1.Body>
  </components_1.Html>);
exports.WelcomeEmail = WelcomeEmail;
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
