import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import UserBar from "./UserBar";
import LoginBar from "../LoginBar";

export default function AdminUsers() {
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
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card m-0">
            <div class="users-container">
              <ul class="users">
                {users
                  ? users.map((u) => {
                      if (u.type === 'user')
                      return <UserBar user={u} action={setAle}></UserBar>;
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
