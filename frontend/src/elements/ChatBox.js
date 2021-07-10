import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {userContext} from '../context/AuthProvider';
import LeftMessage from "./LeftMessage";
import LoginBar from "./LoginBar";
import RightMessage from "./RightMessage";
import getConfig from "next/config";
import { socket } from "../../pages/_app";
const { publicRuntimeConfig } = getConfig();


export default function ChatBox(params) {
  const { user } = useContext(userContext);
  const [er, setEr] = useState(false);
  const msg = useRef();
  let messages = params.msg.messages;
  async function SendMessage(e) {
    e.preventDefault();
    setEr({
      value: false,
    });
    let fullmessage = msg.current.value;
    document.getElementById("message").value = "";
    socket.on('recived', ()=>{
      params.rerender(params.msg.user);
    })
    try {
      const val = await axios.post(publicRuntimeConfig.BACKEND_URL + "/send_message", {
        data: {
          message: fullmessage,
          sender: user.user,
          reciver: params.msg.user,
        },
      });
      if (!val || !val.data || val.data.id < 0)
        return setEr({
          value: true,
          type: "alert-danger",
          message: "Message Didn't Send, Try Again Later",
        });
      params.rerender(params.msg.user);
    } catch (error) {
      setEr({
        value: true,
        type: "alert-danger",
        message: "Message Didn't Send, Try Again Later",
      });
      console.log(error.message);
    }
  }
  function StartAMatch() {
    setEr({
      value: true,
      type: "alert-success",
      message: "Match Request Sent",
    });
  }
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setTimeout(function () {
      scrollToBottom();
    }, 50);
  }, [messages]);
  let v = false;
  return (
    <div>
      {messages ? (
        <div>
          {er?.value ? (
            <LoginBar type={er.type} message={er.message}></LoginBar>
          ) : null}

          <div class="selected-user">
            <span>
              To: <span class="name">{params.msg.user}</span>
            </span>

            <i
              onClick={StartAMatch}
              class="m-2 fas fa-table-tennis fa-2x"
              style={{ float: "right" }}
            ></i>
          </div>
          <div
            class="chat-container"
            style={{ height: "40rem", overflow: "scroll", overflowY: "scroll" }}
          >
            <ul class="chat-box chatContainerScroll">
              {messages.map((m) => {
                let c = 0;
                if (params.msg.myId === m.sender)
                  return (
                    <RightMessage
                      msg={m}
                      user={params.msg.me}
                      avatar={user.avatar}
                    ></RightMessage>
                  );
                else
                {
                  if (m.seen === false && c === 0 && v === false)
                  {
                     v = true;
                     c = 1;
                  }
                  return (
                    <LeftMessage
                      msg={m}
                      avatar={params.msg.userAvatar}
                      user={params.msg.user}
                      unread={c}
                    ></LeftMessage>
                  );
                }
              })}
            </ul>
            <div class="form-group mt-3 mb-0">
              <form className="text-center" onSubmit={SendMessage}>
                <Row>
                  <Col className="text-center" sm={10}>
                    <input
                      type="text"
                      class="form-control"
                      ref={msg}
                      id="message"
                    ></input>
                  </Col>
                  <Col sm={1}>
                    <div className="btn btn-primary"> Send</div>
                  </Col>
                  <div ref={messagesEndRef}></div>
                </Row>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
