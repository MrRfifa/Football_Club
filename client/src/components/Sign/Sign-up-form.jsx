import React, { useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  FormOption,
  FormSelect,
} from "../Sign/signinElements";
import { useContext } from "react";
import swal from "sweetalert";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [type, setType] = useState("Parent");
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        username,
        password,
        passwordVerify,
        type,
      };

      const result = await axios.post(
        "http://localhost:3001/auth/reg",
        registerData
      );
      swal("Success!", result.data.message);
      await getLoggedIn();
      history(`/${type.toLowerCase()}`);
    } catch (error) {
      swal("Oops!", error.response.data.error, "error");
    }
  }

  return (
    <Container>
      <FormWrap>
        <Icon to="/">UrClub</Icon>
        <FormContent>
          <Form action="#" onSubmit={register}>
            <FormH1>Sign up</FormH1>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
              type="text"
              required
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FormLabel htmlFor="password-conf">Confirm Password</FormLabel>
            <FormInput
              type="password"
              placeholder="retype password"
              required
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
            />
            <FormLabel htmlFor="userType">You are a(n)</FormLabel>
            <FormSelect onChange={(e) => setType(e.target.value)} value={type}>
              <FormOption value="Parent">Parent</FormOption>
              <FormOption value="Coach">Coach</FormOption>
              <FormOption value="Member">Member</FormOption>
            </FormSelect>
            <FormButton type="submit">Continue</FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignUpForm;
