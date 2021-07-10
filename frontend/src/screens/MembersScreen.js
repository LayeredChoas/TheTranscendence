import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import UserNotLogged from "../elements/UserNotLogged";
import { userContext } from "../context/AuthProvider";
// import "../css_files/MemberScreen.css"
import FactorScreen from "./FactorScreen";
import axios from "axios";
import getConfig from "next/config";
import { Col, Row } from "react-bootstrap";
const { publicRuntimeConfig } = getConfig();
// import style from './../css_files/LiveScreen.css'

export default function MembersScreen() {
  const { user } = useContext(userContext);
  const [games, setGames] = useState(false);

  async function GetGames() {
    try {
      const val = await axios.get(
        publicRuntimeConfig.BACKEND_URL + "/live_game"
      );
      console.log(val);
      if (!val || val.data.id < 0) return;
      setGames(val.data.games);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    GetGames();
  }, []);
  console.log(user);
  return !user.isLoading ? (
    user.isLoggedIn ? (
      <div className="container text-black main-body text-center">
        <h3>Now Playing</h3>
        <div
          className="GameFrame text-center"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "20rem",
            width: "30rem",
          }}
        >
          <iframe
            title="fhajf vs fsjlkf"
            src="/game"
            title="description"
            style={{
              position: "absolute",
              left: "2rem",
              top: "-6rem",
              width: "30rem",
              height: "50rem",
            }}
          ></iframe>
        </div>
        <div className="SmallMessage">
          <p>Can't Display Game On This Screen Size</p>
        </div>
        {games ? (
          <div>
            Other Live Games
            <div>
              {games.map((g) => {
                return (
                  <div>
                    <div className="card text-center my-2">
                      <p
                        style={{
                          margin: "0",
                          padding: "0.7rem",
                          fontSize: "1.5rem",
                        }}
                      >
                        <Row className="text-center">
                          <Col>{g.p1}</Col>
                          <Col
                            style={{ color: "#17a2b8", fontWeight: "bolder" }}
                          >
                            VS
                          </Col>
                          <Col>{g.p2}</Col>
                        </Row>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    ) : !user.isLoggedIn && user.auth ? (
      <FactorScreen></FactorScreen>
    ) : !user.isLoggedIn ? (
      <UserNotLogged />
    ) : null
  ) : null;
}
