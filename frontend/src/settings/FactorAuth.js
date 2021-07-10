import axios from "axios";
import { useContext, useRef, useState } from "react";
import LoginBar from "../elements/LoginBar";
import UserNotLogged from "../elements/UserNotLogged";
import {userContext} from '../context/AuthProvider';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();


export default function FactorAuth() {
  const { user } = useContext(userContext);
  const em = useRef();
  const [er, setErr] = useState({
    id: false,
    type: "",
    message: "",
  });
  const pass = useRef();
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async function AddAuth(e) {
    const email = em.current.value;
    const password = pass.current.value;
    e.preventDefault();
    setErr({
      id: false,
      type: "",
      message: "",
    });
    if (!email || !validateEmail(email))
      return setErr({
        id: true,
        type: "alert-danger",
        message: "Email Address Is Not Valid",
      });

    if (!password || password.length < 5)
      return setErr({
        id: true,
        type: "alert-danger",
        message: "Password Is Not Valid",
      });
    const val = await axios.post(publicRuntimeConfig.BACKEND_URL + "/user/auth", {
      data: {
        username: user.user,
        email,
        password,
      },
    });
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    if (!val || val.data.id < 0)
      return setErr({
        id: true,
        type: "alert-danger",
        message: "An Error Occured Try Again Later",
      });
      setErr({
        id: true,
        type: "alert-success",
        message: `Email 2-Factor Authentication Has Been Activated With ${email} As Email Address`,
      });
    try {
    } catch (error) {}
  }
  return (
    <div>
      {!user.isLoading && user.isLoggedIn ? (
        <div className="ChangeName">
          {er ? (
            <LoginBar type={er.type} message={er.message}></LoginBar>
          ) : null}
          <form
            onSubmit={AddAuth}
          >
            <div class="form-group text-center">
              <label for="exampleInputEmail1"></label>
              <small
                id="emailHelp"
                class="form-text text-muted DisplayNameText"
              >
                Email 2-Factor Authentication
              </small>
              <input
              id="email"
                type="email"
                class="form-control DisplayNameInput"
                placeholder="Enter Your New Email Address"
                ref={em}
                style={{ width: "17rem" }}
              />
            </div>
            <div class="form-group text-center">
              <label for="exampleInputEmail1"></label>
              <small
                id="emailHelp"
                class="form-text text-muted DisplayNameText"
              >
                Account Password
              </small>
              <input
              id="password"
                type="password"
                class="form-control DisplayNameInput"
                placeholder="Enter Your Account Password"
                ref={pass}
              />
              <button type="submit" class="btn btn-primary m-5">
                Change
              </button>
            </div>
          </form>
        </div>
      ) : !user.isLoading ? (
        <UserNotLogged />
      ) : null}
    </div>
  );
}
