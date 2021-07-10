import { useEffect, useState } from "react";

export default function RightMessage(m) {
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
    <li class="chat-right">
      <div class="chat-hour" style={{ fontSize: "0.6rem" }}>
        {d.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </div>
      <div class="chat-text" style={{ maxWidth: "25rem" }}>
        {m.msg.message}
      </div>
      <div class="chat-avatar">
        <img src={avatar} alt={m.user} />
        <div class="chat-name">{m.user}</div>
      </div>
    </li>
  );
}
