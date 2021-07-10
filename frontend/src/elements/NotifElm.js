import { Col, Row } from "react-bootstrap";
import { socket } from "../../pages/_app";
import Router from "next/router";
export default function NotifElm(params) {
  console.log("in");
  function AcceptGame()
  {
      socket.emit('accept_game', {data:params.elm})
      params.action(false)
      params.click(false)
      Router.push(`/game/${params.elm.gameId}`)
  }
  function DeclineGame()
  {
    console.log('Decline Game')
  }
  return (
    <div className="text-black" style={{minHeight:"3rem", fontSize:"0.8rem"}}>
      <hr></hr>
      <Row>
        <Col className="text-center">{params.elm.player1} is challenging you to a game</Col>
        <Col>
          <i class="fas fa-check m-1" onClick={AcceptGame}></i>
          <i class="fas fa-times m-1" onClick={DeclineGame}></i>
        </Col>
      </Row>
    </div>
  );
}
