import axios from "axios";
import { useContext, useState } from "react";
import FriendRequestElement from "../elements/FriendRequestElement";
import UserNotLogged from "../elements/UserNotLogged";
import {userContext} from '../context/AuthProvider';
// import "./../css_files/FriendsScreen.css";
import FactorScreen from "./FactorScreen";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();


export default function FriendsRequestScreen() {
  const { user } = useContext(userContext);
  const [friends, setFriends] = useState(false);

  async function GetFriendsRequest() {
    try {
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL  + `/${user.user}/friendsrequest`);
      if (!val || val.data.id <= 0) return;
      if (!val.data) return;
      setFriends(val.data);
      console.log(val.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function Reload() {
    setFriends(false);
  }

  if (!friends) GetFriendsRequest();
  return !user.isLoading && user.isLoggedIn && user.auth ? (
    <div className="container py-4">
      <div class="row my-2">
        {!friends
          ? null
          : friends.map((f) => {
              return (
                <FriendRequestElement
                  user={f}
                  v={user.user}
                  fun={Reload}
                ></FriendRequestElement>
              );
            })}
      </div>
    </div>
  ) : !user.auth  && !user.isLoading? (
    <FactorScreen></FactorScreen>
  ) : !user.isLoading ? (
    <UserNotLogged />
  ) : null;
}
