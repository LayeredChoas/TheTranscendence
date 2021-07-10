import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { auth } from "../functions/auth";
import { userContext } from "../context/AuthProvider";
import Router from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function RedirectScreen(params) {
  const [userval, SetUser] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(userContext);

  useEffect(() => {
    console.log();
    const p = Router.asPath;
    const code = p.split("?code=")[1];

    setTimeout(async function () {
      if (!code) SetUser(true);
      else {
        try {
          const val = await axios.post(
            publicRuntimeConfig.BACKEND_URL + "/auth_user",
            {
              data: {
                intra_code: code,
              },
            }
          );
          console.log(val.data);
          if (val.data.id <= 0) return SetUser(true);
          else {
            const { id, message, token } = val.data;
            if (token) localStorage.setItem("auth_key", token);
            const ret = await auth("red");
            console.log("ret val:", ret)
            setUser({
              isLoading: ret.isLoading,
              isLoggedIn: ret.isLoggedIn,
              user: ret.user,
              token: ret.token,
              avatar: ret.avatar,
              xp: ret.xp,
              auth: ret.auth,
            });
            // if (ret) {
            //   if (!ret.auth && ret.back_auth) {
            //     console.log(ret);
            //     const v = await axios.post(
            //       publicRuntimeConfig.BACKEND_URL + "/send/auth",
            //       {
            //         data: {
            //           username: ret.user,
            //         },
            //       }
            //     );
            //     setUser({
            //       isLoading: false,
            //       isLoggedIn: true,
            //       user: ret.user,
            //       token: ret.token,
            //       avatar: ret.avatar,
            //       xp: ret.xp,
            //       auth: false,
            //     });
            //   } else {
            //     console.log(ret);
            //     setUser({
            //       isLoading: false,
            //       isLoggedIn: true,
            //       user: ret.user,
            //       token: ret.token,
            //       avatar: ret.avatar,
            //       xp: ret.xp,
            //       auth: true,
            //     });
            //   }
            // }
            if (message) Router.push("/member");
            else Router.push("/new-user");
          }
        } catch (error) {
          console.log(error.message);
          SetUser(true);
        }
      }
    }, 5000);
  }, []);
  async function StartFunction() {}
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className="Register">
          {userval ? (
            <div className="alert alert-danger" role="alert">
              An Error Happned Try Again Later
            </div>
          ) : (
            <div>
              <div className="col align-self-start">
                {/* One of three columns */}
              </div>
              <div className="col">
                <h1 className="text-black">
                  Loading...{" "}
                  <div className="spinner-border align-self-center text-red"></div>
                </h1>
              </div>
              <div className="col align-self-end">
                {/* One of three columns */}
              </div>
            </div>
          )}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default RedirectScreen;
