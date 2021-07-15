import axios from "axios";
import { useContext, useState } from "react";
import FriendElement from "../elements/FriendElement";
import UserNotLogged from "../elements/UserNotLogged";
import { userContext } from "../context/AuthProvider";
import FactorScreen from "./FactorScreen";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function FriendsScreen() {
  const { user } = useContext(userContext);
  const [friends, setFriends] = useState(false);

  async function GetFriends() {
    try {
      const val = await axios.get(
        publicRuntimeConfig.BACKEND_URL + `/${user.user}/friends`
      );
      if (!val || val.data.id <= 0) return;
      setFriends(val.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (!friends) GetFriends();
  return (
      <div className="container py-4">
        <div class="row my-2">
          {!friends
            ? null
            : friends.friends.map((f) => {
                return <FriendElement user={f}></FriendElement>;
              })}
        </div>
      </div>
    )
}
