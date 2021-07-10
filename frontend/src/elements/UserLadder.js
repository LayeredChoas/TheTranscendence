import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
const colors = {
    "0":"#ebebff",
    "1":"#c4c4ff",
    "2":"#b0b0ff",
    "3":"#8989ff",
    "4":"#7575ff",
    "5":"#3f51b5",
    
}
export default function UserLadder(params) {
  let level = 0;

  if (params.user.xp >= 200) level = 1;
  if (params.user.xp >= 300) level = 2;
  if (params.user.xp >= 500) level = 3;
  if (params.user.xp >= 700) level = 4;
  if (params.user.xp >= 1000) level = 5;
  const [avatar, setAvatar] = useState(false);
  function get_av(s) {
    try {
      const p = s.split("/uploads/")[1];
      if (!p) {
        setAvatar(s);
        return s;
      }
      const path = "/uploads/" + p;
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
    } catch (error) {}
  }
  useEffect(() => {
    setAvatar(params.user.avatar);
  }, []);
  console.log(params.v)
  return (
    <tr class="candidates-list" style={{background:colors[level]}}>
        <td>#{params.v}</td>
      <td class={`${params.user.username}`}>
        <div class="thumb">
          <img
            class="img-fluid"
            src={avatar}
            alt=""
            style={{ borderRadius: "2rem", maxHeight: "4rem", maxWidth: "4rem" }}
          />
        </div>
        <div class="candidate-list-details">
          <div class="candidate-list-info">
            <div class="candidate-list-title">
              <h5 class="mb-0 text-center">
                <a href={`/user/${params.user.username}`} style={{fontSize:"1.05rem", color:"#270000"}}>
                  {params.user.username}
                </a>
              </h5>
            </div>
          </div>
        </div>
      </td>
      <td>{params.user.xp}</td>
      <td class="action text-right">{level}</td>
    </tr>
  );
}
