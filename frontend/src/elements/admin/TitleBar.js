import axios from "axios";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import getConfig from "next/config";
import Router from "next/router";
import { userContext } from "../../context/AuthProvider";

const { publicRuntimeConfig } = getConfig();

export default function TitleBar(params) {
  const { user } = useContext(userContext);
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
    } catch (error) {}
  }
  if (!avatar) get_av(params.user.avatar);

  async function ChangeTitle(num) {
    try {
      const in_val = document.getElementById("title_holder").value;
      if (in_val.length <= 5)
        return params.action({
          type: "alert-danger",
          message: "Title Can't Be Shorter Than 5 Characters.",
        });
      const val = await axios.post(
        publicRuntimeConfig.BACKEND_URL + "/admin/change_title",
        {
          data: {
            username: params.user.username,
            title: in_val,
          },
        }
      );
      if (!val || val.data.id <= 0)
        return params.action({
          type: "alert-danger",
          message: "An Error Occured, Try Again Later",
        });
      params.action({
        type: "alert-success",
        message: `${params.user.username} Title Updated successfully`,
      });
    } catch (error) {
      console.log(error.message);
      return params.action({
        type: "alert-danger",
        message: "An Error Occured, Try Again Later",
      });
    }
  }
  return (
    <li className="person" data-chat="person1">
      <Row>
        <Col>
          <div
            className="user"
            id={params.user.username}
            style={{ position: "absolute", left: "1rem", top: "-0.41rem" }}
          >
            <img
              src={avatar}
              alt={params.user.username}
              onClick={() => {
                Router.push(`/user/${params.user.username}`);
              }}
            />
          </div>

          <p className="name-time" style={{ marginLeft: "-30rem" }}>
            <span className="name">{params.user.username}</span>
          </p>
          <div
            style={{
              display: "inline-block",
              marginLeft: "1rem",
              position: "absolute",
              right: "1rem",
            }}
          >
            <input
              id="title_holder"
              style={{ width: "30rem" }}
              onSubmit={(e) => {
                e.preventDefault();
                ChangeTitle();
              }}
            ></input>
            <i
              className="fas fa-exchange-alt p-1"
              onClick={() => {
                ChangeTitle();
              }}
            ></i>
          </div>
        </Col>
      </Row>
    </li>
  );
}
