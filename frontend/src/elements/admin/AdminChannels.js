import axios from "axios";
import { useEffect, useState } from "react";
import UserBar from "./UserBar";
import getConfig from "next/config";
import ChannelsBar from "./ChannelsBar";
import LoginBar from "../LoginBar";
const { publicRuntimeConfig } = getConfig();

export default function AdminChannels() {
  const [ale, setAle] = useState({
    type: "",
    message: "",
  });
  const [users, setUsers] = useState(false);
  useEffect(async () => {
    try {
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL + "/search");
      setUsers(val.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div class="content-wrapper">
      {ale.type.length ? (
        <LoginBar type={ale.type} message={ale.message}></LoginBar>
      ) : null}
      <div
        class="row"
        style={{
          border: "0.1rem solid",
          borderRadius: "1rem",
          background: "#f4f5fa !important",
        }}
      >
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card m-0" style={{ border: "none" }}>
            <div
              class="users-container"
              style={{ border: "none", background: "#f4f5fa !important" }}
            >
              <ul class="users">
                {users
                  ? users.map((u) => {
                      if (u.name.search("Channel") >= 0)
                        return (
                          <ChannelsBar user={u} action={setAle}></ChannelsBar>
                        );
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
