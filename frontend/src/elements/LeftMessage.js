import { useEffect, useState } from "react";
import get_avatar from "./UserAvatar";

export default function LeftMessage(m) {
  const [avatar, setAvatar] = useState(false);
  function get_av(s) {
    try {
      const p = s.split("/uploads/")[1];
      if (!p) {
        setAvatar(s);
        return "";
      }
      const path = "/uploads/" + p;
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
  useEffect(() => {
    get_av(m.avatar);
  }, [m.user]);
  const d = new Date(m.msg.createdAt);
  return (
    <div>
      {m.unread ? (
        <div>
          {" "}
          <h6
            className="text-center"
            style={{ fontSize: "0.5rem", color: "grey" }}
          >
            Unread Messages
          </h6>
          <hr
            style={{ color: "black", width: "100%", height: "0.001rem" }}
          ></hr>
        </div>
      ) : null}

      <li class="chat-left">
        <div class="chat-avatar">
          <img src={avatar} alt={m.user} />
          <div class="chat-name">{m.user}</div>
        </div>
        <div class="chat-text" style={{ maxWidth: "25rem" }}>
          {m.msg.message}
        </div>
        <div class="chat-hour" style={{ fontSize: "0.6rem" }}>
          {d.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </div>
      </li>
    </div>
  );
}
