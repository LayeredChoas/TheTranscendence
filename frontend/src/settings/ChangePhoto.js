// import "../css_files/NewUser.css";
// import "../css_files/ImageCanvas.css";
// import "../css_files/SettingsScreen.css";
import { useContext, useState} from "react";
import axios from "axios";
import LoginBar from "../elements/LoginBar";
import {userContext} from '../context/AuthProvider';
import UserNotLogged from "../elements/UserNotLogged";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
// import styles from './sty.module.css'

export default function ChangePhoto() {
  const [file, setFile] = useState(false);
  const [SelFile, setSelFile] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [user_avatar, setAvatar] = useState(false);

  function GetFile(e) {
    setError(false);
    setFile(e.target.files[0]);
    setSelFile(e.target.files[0].name);
  }

  async function SubmitFile(e) {
    e.preventDefault();

    if (!SelFile) return setError("No File Is Selected");
    const myfile = new FormData();
    try {
      myfile.append("myfile", file, file.name);
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(file.name)[1];
      if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg")
        return setError("Unsupported File Type");
    } catch (error) {
      setError("Please Select A File ...");
    }
    try {
      const val = await axios.post(publicRuntimeConfig.BACKEND_URL + `/upload/${user.user}`, myfile);
      if (val.data.id <= 0) return setError("An Error Occured Try Again Later");
      setFile(false);
      setSelFile(false);
      setUser({
        isLoading: user.isLoading,
        isLoggedIn: user.isLoggedIn,
        user: user.user,
        token: user.token,
        avatar: val.data.avatar,
      });
      get_av(val.data.avatar);
      return val;
    } catch (error) {
      console.log(error.message);
      setError("An Error Occured Try Again Later");
    }
  }
  /* Get User Image */
  async function get_av(s) {
    console.log(user)
    if (user_avatar)
      return ;
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

  function RestFile() {
    setSelFile(false);
    setFile(false);
    setError(false);
  }
  
  return (
    <div>
      {!user.isLoading && user.isLoggedIn ? (
        <div class="tab-pane fade active show">
          <div class="card-body media align-items-center">
            <img src={user_avatar} alt="" class="d-block ui-w-80" onLoad={() =>{get_av(user.avatar)}}/>
            <div class="media-body ml-4">
              <label class="btn btn-outline-primary">
                Upload new photo
                <input
                  onChange={GetFile}
                  type="file"
                  class="account-settings-fileinput"
                />
              </label>{" "}
              &nbsp;
              <button
                onClick={RestFile}
                type="button"
                class="btn btn-default md-btn-flat"
              >
                Reset
              </button>
              <div class="text-light small mt-1">
                Allowed JPG, JEPG, GIF or PNG.
              </div>
            </div>
          </div>
          <hr class="border-light m-0" />

          <div class="text-center mt-3">
            <button
              onClick={SubmitFile}
              type="button"
              class="btn btn-primary m-5"
            >
              Save changes
            </button>
          </div>
          {error ? (
            <div className="text-center w-50 ml-auto mr-auto ">
              <LoginBar type="alert-danger" message={error}></LoginBar>{" "}
            </div>
          ) : (
            <div class="text-light text-center mt small mt-1">{SelFile}</div>
          )}
        </div>
      ) : !user.isLoading ? (
        <UserNotLogged />
      ) : null}
    </div>
  );
}
