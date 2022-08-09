import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
} from "../Sign/signinElements";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password,
      };

      const result = await axios.post(
        "http://localhost:3001/auth/login",
        loginData
      );

      const loggedInRes = await axios.get(
        "http://localhost:3001/auth/loggedIn"
      );
      const type = loggedInRes.data.type;
      let initroute = "";

      if (type === "Parent") {
        initroute = "kid";
      } else if (type === "Coach") {
        initroute = "pending";
      } else {
        initroute = "all";
      }
      await getLoggedIn();

      history(`/${initroute}`);
      swal("Success!", result.data.message);
    } catch (error) {
      swal("Oops!", error.response.data.error, "error");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <Container>
      <FormWrap>
        <Icon to="/">UrClub</Icon>
        <FormContent>
          <Form action="#" onSubmit={login}>
            <FormH1>Sign in to your account</FormH1>
            <FormLabel htmlFor="for">Username</FormLabel>
            <FormInput
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <FormLabel htmlFor="for">Password</FormLabel>
            <FormInput
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FormButton type="submit">Continue</FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignInForm;
