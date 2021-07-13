import axios from "axios";
import { useEffect, useState } from "react";
import UserBar from "./UserBar";
import getConfig from "next/config";
import XPBar from "./XPBar";
import LoginBar from "../LoginBar";
import PassBar from "./PassBar";
const { publicRuntimeConfig } = getConfig();

export default function AdminRUP() {
  const [ale, setAle] = useState({
    type: "",
    message: "",
  });
  const [users, setUsers] = useState(false);
  useEffect(async () => {
    try {
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL + "/search");
      console.log(val.data);
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
                      if (u.name.search("User") >= 0)
                        return <PassBar user={u} action={setAle}></PassBar>;
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
