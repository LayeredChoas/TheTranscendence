import { Col, Row } from "react-bootstrap";
import { socket } from "../../pages/_app";
import Router from "next/router";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function NotifElm(params) {
  async function AcceptGame() {
    console.log(params.elm);
    params.action(false);
    params.click(false);
    try {
      const val = await axios.post(
        publicRuntimeConfig.BACKEND_URL + "/game/live",
        {
          data: {
            gameId: params.elm.gameId,
          },
        }
      );
      socket.emit("accept_game", { data: params.elm });
    } catch (error) {
      console.log(error.message);
    }
    Router.push(`/game/${params.elm.gameId}`);
  }
  function DeclineGame() {
    console.log("Decline Game");
  }
  return (
    <div
      className="text-black"
      style={{ minHeight: "3rem", fontSize: "0.8rem" }}
    >
      <hr></hr>
      <Row>
        <Col className="text-center">
          {params.elm.player1} is challenging you to a game
        </Col>
        <Col>
          <i className="fas fa-check m-1" onClick={AcceptGame}></i>
          <i className="fas fa-times m-1" onClick={DeclineGame}></i>
        </Col>
      </Row>
    </div>
  );
}
