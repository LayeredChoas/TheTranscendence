import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
// import "../css_files/MessagesScreen.css";
import ChatBox from "../elements/ChatBox";
import UserBlob from "../elements/UserBlob";
import UserNotLogged from "../elements/UserNotLogged";
import {userContext} from '../context/AuthProvider';
import FactorScreen from "./FactorScreen";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();


export default function MessagesScreen() {
  const { user } = useContext(userContext);
  const [messages, setMessages] = useState(false);

  const [users, setUsers] = useState({
    loaded: false,
    data: [],
  });

  async function GetUsers() {
    try {
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL + `/${user.user}/friends`);
      if (!val || val.data.id <= 0) return;
      setUsers({
        loaded: true,
        data: val.data.friends,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async function GetUserMessages(e) {
    try {
      const val = await axios.post(publicRuntimeConfig.BACKEND_URL + "/messages", {
        data: {
          username: user.user,
          user_msg: e,
        },
      });
      if (!val || val.data.id < 0) return;
      setMessages(val.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  if (!users.loaded && !user.isLoading) GetUsers();

  return !user.isLoading && user.isLoggedIn && user.auth ? (
    <div>
      <div class="container text-black pt-5">
        <div class="page-title">
          <div class="row gutters">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 class="title">Friends Chat</h5>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
          </div>
        </div>

        <div class="content-wrapper">
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="card m-0">
                <div class="row no-gutters">
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                    <div class="users-container">
                      <ul class="users">
                        {users.loaded && users.data && users.data.length > 0
                          ? users.data.map((u) => {
                              if (u.status === "Online") u.status = "online";
                              return (
                                <div>
                                  <UserBlob
                                    user={u}
                                    click={GetUserMessages}
                                  ></UserBlob>
                                </div>
                              );
                            })
                          : null}
                      </ul>
                    </div>
                  </div>

                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                    <ChatBox
                      msg={messages}
                      rerender={GetUserMessages}
                    ></ChatBox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : !user.auth  && !user.isLoading? (
    <FactorScreen></FactorScreen>
  ) : !user.isLoading ? (
    <UserNotLogged />
  ) : null;
}
