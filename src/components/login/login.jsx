import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Login(props) {
  const [phone, setphone] = useState(0);
  const [password, setpassword] = useState("");
  const [sent, setsent] = useState(false);
  const [error, seterror] = useState(false);
  let history = useHistory();
  async function send() {
    try {
      setsent(false);
      seterror(false);
      const res = await axios.post(
        `https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${phone}`,
        {},
        {
          headers: {
            transactionId: "react_interview",
          },
        }
      );
      console.log(res);
      setsent(true);
    } catch {
      seterror(true);
    }
  }

  async function verify() {
    try {
      seterror(false);
      const res = await axios.post(
        `https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${phone}&otp=${password}&de
        viceKey=abcd&isIos=false&source=react_interview`,
        {},
        {
          headers: {
            transactionId: "react_interview",
          },
        }
      );
      console.log(res.data.Response.access_token);
      localStorage.setItem("token", res.data.Response.access_token);
      props.success();
      history.push("/");
    } catch {
      seterror(true);
    }
  }

  return (
    <div className="form-box">
      <Typography variant="h5" gutterBottom component="div" className="login">
        Login
      </Typography>
      <br />
      <br />
      <TextField
        required
        id="outlined-number"
        type="number"
        label="Phone"
        onChange={(e) => setphone(e.target.value)}
      />
      <br />
      <br />
      {sent && (
        <TextField
          id="outlined-password-input"
          label="Enter OTP"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setpassword(e.target.value)}
        />
      )}

      <br />
      {error && (
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          className="error"
        >
          Incorrect OTP
        </Typography>
      )}
      <br />
      <br />
      {sent ? (
        <div>
          <Button variant="contained" id="btnLogin" onClick={(e) => send()}>
            Resend OTP
          </Button>
          &nbsp;
          <Button variant="contained" id="btnLogin" onClick={(e) => verify()}>
            Login
          </Button>
        </div>
      ) : (
        <Button variant="contained" id="btnLogin" onClick={(e) => send()}>
          Generate OTP
        </Button>
      )}
      <br />
    </div>
  );
}

export default Login;
