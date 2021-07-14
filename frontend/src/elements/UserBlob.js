import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../../pages/_app";

export default function UserBlob(params) {
  const [avatar, setAvatar] = useState(false);
  let val = params.user.message_c;

  function get_av(s) {
    try {
      const p = s.split("/uploads/")[1];
      if (!p) {
        setAvatar(s);
        return "";
      }
      const path =publicRuntimeConfig.BACKEND_URL +  "/uploads/" + p;
      fetch(path)
        .then(function (response) {
          return response.blob();
        })
        .then(function (res) {
          let imgObjectURL = URL.createObjectURL(res);
          if (imgObjectURL) {
            console.log(imgObjectURL);
            setAvatar(imgObjectURL);
          }
        });
    } catch (error) {}
  }
  const v = window.location?.hash.substring(1);

  useEffect(() => {
    params.click(v);
  }, [v]);

  if (!avatar) get_av(params.user.avatar);
  console.log(params.user.username, params.user.status)
  return (
    <div>
      {
        <li
          class="person"
          data-chat="person1"
          id={params.user.username}
          onClick={() => {
            params.user.message_c = 0;
            params.click(params.user.username);
          }}
        >
          <div class="user" id={params.user.username}>
            <img src={avatar} alt={params.user.username} />
            <span className={`user-status ${params.user.status}`}></span>
          </div>
          <p class="name-time" style={{ width: "70%" }}>
            <span class="name">{params.user.username}</span>
            {params.user.message_c > 0 ? (
              <span class="badge badge-danger" style={{ float: "right" }}>
                {params.user.message_c}
              </span>
            ) : null}
          </p>
        </li>
      }
    </div>
  );
}