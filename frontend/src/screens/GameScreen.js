import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import UserNotLogged from "../elements/UserNotLogged";
import { userContext } from "../context/AuthProvider";
// import "./../css_files/GameScreen.css";
import FactorScreen from "./FactorScreen";
import { socket } from "../../pages/_app";
let username_val;
let ingame;
let gamesnum;
let gameId;
let user_xp;
let user_pay = 0;

class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  get len() {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  set len(value) {
    const fact = value / this.len;
  }
}

class Rect {
  constructor(w, h) {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left() {
    return this.pos.x - this.size.x / 2;
  }
  get right() {
    return this.pos.x + this.size.x / 2;
  }
  get top() {
    return this.pos.y + this.size.y / 2;
  }
  get bottom() {
    return this.pos.y - this.size.y / 2;
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}

class Player extends Rect {
  constructor() {
    super(5, 100);
    this._score = 0;
    this._hit_power = 1.1;
  }
}

const bgs = {
  sb: "#000000",
  sw: "#12A0EF",
  w: "",
};

class Pong {
  constructor(elm, type, rounds, arena, gameId) {
    this._gamesnum = 0;
    this._ingame = false;
    this._type = type;
    this._arena = arena;
    this._bg = bgs[arena];
    this._gameId = gameId;
    this._rounds = rounds;
    gameId = gameId;
    ingame = false;
    gamesnum = 0;
    this._canvas = elm;
    this._context = this._canvas.getContext("2d");
    this._ball = new Ball();
    this._players = [new Player(), new Player()];
    this.reset();
    let v_time = 0;
    let lasttime, lasttimev1;
    let callback = (millis) => {
      if (lasttime) {
        this.update((millis - lasttime) / 5000);
      }
      lasttime = millis;
      requestAnimationFrame(callback);
    };
    callback();
  }
  collide_p1(player, ball) {
    if (this._ball.left <= player.right) {
      if (
        this._ball.pos.y >= player.pos.y &&
        this._ball.pos.y <= player.pos.y + player.size.y
      ) {
        this._ball.vel.x = -ball.vel.x;
        this._ball.vel.x *= player._hit_power;
        this._ball.vel.y *= player._hit_power;
      }
    }
  }
  collide_p2(player, ball) {
    if (
      this._ball.right >= player.left &&
      this._ball.pos.y >= player.pos.y &&
      this._ball.pos.y <= player.pos.y + player.size.y
    ) {
      this._ball.vel.x = -ball.vel.x;
      this._ball.vel.x *= player._hit_power;
      this._ball.vel.y *= player._hit_power;
    }
  }
  drawScore() {
    this._context.font = "20px Arial";
    this._context.fillStyle = "#0095DD";
    this._context.fillText(
      this._players[0]._score,
      this._canvas.width / 4 - this._canvas.width / 8,
      40
    );

    this._context.font = "20px Arial";
    this._context.fillStyle = "#0095DD";
    this._context.fillText(
      this._players[1]._score,
      (3 * this._canvas.width) / 4 + this._canvas.width / 8,
      40
    );
  }
  draw() {
    if (this._arena != "w") {
      this._context.fillStyle = this._bg;
      this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    } else {
      this._context.fillStyle = "#000000";
      this._context.fillRect(
        0,
        0,
        this._canvas.width / 10,
        this._canvas.height
      );

      this._context.fillStyle = "white";
      this._context.fillRect(
        this._canvas.width / 10,
        0,
        this._canvas.width - this._canvas.width / 10,
        this._canvas.height
      );

      this._context.fillStyle = "#000000";
      this._context.fillRect(
        this._canvas.width - this._canvas.width / 10,
        0,
        this._canvas.width,
        this._canvas.height
      );
    }
    this.drawLine();
    this.drawRect(this._ball);
    this._players.forEach((player) => this.drawRect(player));
    this.drawScore();
  }
  drawRect(rect) {
    this._context.fillStyle = "#fff";
    this._context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
  }
  drawLine() {
    this._context.beginPath();
    this._context.moveTo(this._canvas.width / 2, 0);
    this._context.lineTo(this._canvas.width / 2, this._canvas.height);
    this._context.lineWidth = 2;
    this._context.stroke();
  }
  reset() {
    this._players[0].pos.x = 20;
    this._players[1].pos.x = this._canvas.width - 20;
    this._players.forEach((player) => {
      player.pos.y = this._canvas.height / 2 - player.size.y / 2;
      player._hit_power = 1.1;
    });

    this._ball.pos.x = this._canvas.width / 2 - this._ball.size.x / 2;
    this._ball.pos.y = this._canvas.height / 2 - this._ball.size.y / 2;
    this._ball.vel.x = 0;
    this._ball.vel.y = 0;
    this._ingame = false;
    ingame = false;
    socket.emit("rest_game", {
      data: {
        ball: this._ball,
        players: this._players,
        user: username_val,
        gamesnum: this._gamesnum,
        gameId: this._gameId,
      },
    });
    socket.on("rest_game_vals", (data) => {
      console.log("rest : ", data);
      if (data.data.gameId === this._gameId) {
        this._players[0]._score = data.data.players[0]._score;
        this._players[1]._score = data.data.players[1]._score;
        this._gamesnum = data.data.gamesnum;

        gamesnum = data.data.gamesnum;
      }
      console.log("rest : ", this._gamesnum);
    });
    socket.on('update_powers', (data)=>{
      this._players[0]._hit_power = data.data.players[0]._hit_power
      this._players[1]._hit_power = data.data.players[1]._hit_power

      this._players[0]._size.y =  data.data.players[0]._size.y
      this._players[1]._size.y =  data.data.players[1]._size.y
    })
  }
  start() {
    if (this._ball.vel.x === 0 && this._ball.vel.y === 0) {
      this._ball.vel.x = 300 * (Math.random() > 0.5 ? 1 : -1);
      this._ball.vel.y = 300 * (Math.random() > 0.5 ? 1 : -1);
    }
  }

  update(dt) {
    const b = this._ball.pos;
    this._ball.pos.x += this._ball.vel.x * dt;
    this._ball.pos.y += this._ball.vel.y * dt;

    if (this._ball.left <= 20 || this._ball.right >= this._canvas.width - 20) {
      const userId = this._ball.left <= 0 ? 1 : 0;
      this._players[userId]._score++;
      this.reset();
    }
    if (this._ball.top <= 0 || this._ball.bottom >= this._canvas.height) {
      this._ball.vel.y = -this._ball.vel.y;
    }
    this.collide_p1(this._players[0], this._ball);
    this.collide_p2(this._players[1], this._ball);

    this.v_time += dt;
    if (this.v_time >= 1) {
      socket.emit("update_ball", {
        data: { ball: this._ball, gameId: this._gameId },
      });
      v_time = 0;
    }
    this.draw();
  }
  inc_size(player) {
    if (this._players[0].size.y < 200) this._players[0].size.y += 25;
  }
  inc_power(player) {
    if (this._players[0]._hit_power < 2) this._players[0]._hit_power *= 1.1;
  }
  dec_size() {
    if (this._players[1].size.y > 25) this._players[1].size.y -= 25;
  }
  emit()
  {
    console.log("Pong Emit")
    socket.emit("power_ups", {
      data: { gameId: this._gameId, players: this._players}
    });
  }
}

export default function GameScreen(params) {
  const { user } = useContext(userContext);
  const [el, setEl] = useState(false);
  const [end, setEnd] = useState(false);
  const [turn, setTurn] = useState({
    ingame: false,
    gamesnum: 0,
    u: -1,
  });
  let pong;
  let u = -1;
  user_xp = 0;

  if (process.browser) {
    window.onbeforeunload = () => {
      socket.emit("leave game", {
        data: { username: user.user, gameId: gameId },
      });
    };
  }

  useEffect(() => {
    if (user_xp === 0) user_xp = user.xp;
    username_val = user.user;
    const elm = document.getElementById("pong");
    if (user.user === params.data?.player1) u = 0;
    else if (user.user === params.data?.player2) u = 1;
    if (user.user)
      if (elm) {
        socket.emit("in game", {
          data: { username: user.user, gameId: params.gameId },
        });
        setTimeout(() => {
          pong = new Pong(
            elm,
            params.data.type,
            params.data.round,
            params.data.arena,
            params.gameId
          );
          if (u >= 0) {
            elm.addEventListener("mousemove", (event) => {
              const scale =
                event.offsetY / event.target.getBoundingClientRect().height;
              pong._players[u].pos.y =
                elm.height * scale - pong._players[u].size.y / 2;
              socket.emit("update_game", {
                data: {
                  p: pong._players[u],
                  username: user.user,
                  player: u,
                  gameId: pong._gameId,
                },
              });
              if (
                pong._players[0]._score + pong._players[1]._score >=
                pong._rounds
              ) {
                setEnd(true);
                params.endgame(true);
              }
            });

            elm.addEventListener("click", (event) => {
              if (pong._gamesnum % 2 === u && !pong._ingame) {
                pong.start();
                pong._ingame = true;
                pong._gamesnum++;
                ingame = true;
                gamesnum = pong._gamesnum;
                setTurn({
                  ingame,
                  gamesnum,
                });
                socket.emit("update_ball", {
                  data: {
                    ball: pong._ball,
                    num: pong._gamesnum,
                    gameId: pong._gameId,
                  },
                });
              }
            });
            socket.on("live_feed", () => {
              socket.emit("game_feed", {
                data: {
                  ball: pong._ball,
                  players: pong._players,
                  gameId: pong._gameId,
                  gamesnum: pong._gamesnum,
                },
              });
            });
          }

          socket.on("update_game", (data) => {
            if (data.data.p && pong._gameId === data.data.gameId)
              pong._players[data.data.player].pos = data.data.p.pos;
          });
          socket.on("update_ball_pos", (data) => {
            if (data.data.ball && data.data.gameId === pong._gameId) {
              pong._ball.pos = data.data.ball.pos;
              pong._ball.vel = data.data.ball.vel;
              pong._gamesnum = data.data.num;
              setTurn({
                ...turn,
                ingame: true,
              });
            }
          });
          socket.on("rest_game_vals", (data) => {
            if (pong._gameId === data.data.gameId) {
              pong._players[0]._score = data.data.players[0]._score;
              pong._players[1]._score = data.data.players[1]._score;
              pong._ingame = false;
              ingame = false;
              console.log(data);
              setTurn({
                ...turn,
                ingame,
                gamesnum: data.data.gamesnum,
                u,
              });
            }
          });
          socket.on("live_game", (data) => {
            if (data.data.gameId === gameId) {
              pong._ball.pos = data.data.ball.pos;
              pong._ball.vel = data.data.ball.vel;
              pong._gamesnum = data.data.gamesnum;
              pong._players[0]._score = data.data.players[0]._score;
              pong._players[1]._score = data.data.players[1]._score;
              setTurn({
                ...turn,
                ingame: pong._ingame,
                gamesnum: data.data.gamesnum,
                u,
              });
            }
          });
          socket.emit("get_game", {
            data: {
              gameId: gameId,
            },
          });
        }, [1000]);
      }
  }, [user.user]);

  function ClickMe(e) {
    let base_xp = 10;

    if (params.type === "Title") base_xp += 10;
    if (e.target.id === "s+") {
      user_pay += 2;
      if (user_xp > user_pay + base_xp) pong.inc_size();
    } else if (e.target.id === "p+") {
      user_pay += 1;
      if (user_xp > user_pay + base_xp) pong.inc_power();
    } else if (e.target.id === "s-") {
      user_pay += 5;
      if (user_xp > user_pay + base_xp) pong.dec_size();
    }
    // pong.emit()

  }

  useEffect(() => {
    setTurn({
      gamesnum: gamesnum,
      ingame: ingame,
      u,
    });
  }, []);
  console.log("user: ", user.user, params.data.player1);
  return user.user ? (
    <div className="container text-center text-black">
      <Col>
        <h3>{params.data?.player1 + " vs " + params.data?.player2} </h3>
      </Col>
      <Col className="py-3">
        <canvas
          id="pong"
          className="pongcanvas"
          width="600rem"
          height="400rem"
        ></canvas>
      </Col>
      {!turn.ingame && turn.u >= 0 ? (
        turn.gamesnum % 2 === turn.u ? (
          <div className="text-black">
            {" "}
            {user.user} Turn To Start The Game, click inside the game
          </div>
        ) : (
          <div>
            <div>
              {user.user != params.data.player1
                ? params.data.player1
                : params.data.player2}{" "}
              Turn To Start The Game, click inside the game
            </div>
          </div>
        )
      ) : null}
      {(user.user === params.data.player1 ||
        user.user === params.data.player2) &&
      !turn.ingame ? (
        <div>
          <Col className="my-2">Power Ups</Col>
          <Col className="text-center">
            <div
              className="btn btn-primary m-2 pongcanvas"
              id="s+"
              onClick={ClickMe}
            >
              Increase My Size (-2XP)
            </div>
            <div
              className="btn btn-primary m-2 pongcanvas"
              id="p+"
              onClick={ClickMe}
            >
              Increase My Hit Power (-1XP)
            </div>
            <div
              className="btn btn-primary m-2 pongcanvas"
              id="s-"
              onClick={ClickMe}
            >
              Decrease My Opponent Size (-5XP)
            </div>
          </Col>
        </div>
      ) : null}
    </div>
  ) : null;
}
