import { useState } from "react";
import Router from "next/router";

export default function FriendElement(props) {
  const [avatar, setAvatar] = useState(false);
  function get_av(s) {
    try {
      const p = s.split("/uploads/")[1];
      if (!p) {
        setAvatar(s);
        return s;
      }
      const path = publicRuntimeConfig.BACKEND_URL + "/uploads/" + p;
      const val = fetch(path)
        .then(function (response) {
          return response.blob();
        })
        .then(function (res) {
          let imgObjectURL = URL.createObjectURL(res);
          if (imgObjectURL) {
            setAvatar(imgObjectURL);
            return imgObjectURL;
          }
        });
      return val;
    } catch (error) {
      console.log(error.message);
    }
  }
  if (!avatar) get_av(props.user.avatar);
  return (
    <div class="col-md-4">
      <div class="card text-center" style={{ width: "14rem" }}>
        <div class="user-heading-list round-list">
          <a href={`/user/${props.user.username}`}>
            <img src={avatar} class="card-img-top text-black" />
          </a>
        </div>
        <div class="card-body">
          <h5 class="card-title text-center text-black">
            {props.user.username}
          </h5>

          <p class="card-text text-color" style={{ fontSize: "small" }}>
            {props.user.title.length > 20
              ? props.user.title.substr(0, 20) + "..."
              : props.user.title}
          </p>
          <div className="text-center">
            <p
              class="status"
              onClick={() => {
                if (props.user.status === "in_game")
                  Router.push(`/game/${props.user.gameId}`);
              }}
            >
              {props.user.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
