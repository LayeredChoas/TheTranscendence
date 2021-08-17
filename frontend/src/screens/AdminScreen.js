import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
// import { userContext } from "../../context/AuthProvider";
import AdminUsers from "../elements/admin/AdminUsers";
import { userContext } from "./../context/AuthProvider";
// import styles from "../css_files/AdminScreen.css"
import getConfig from "next/config";
import AdminMUX from "../elements/admin/AdminMUX";
import AdminMUT from "../elements/admin/AdminMUT";
import AdminRUP from "../elements/admin/AdminRUP";
import AdminChannels from "../elements/admin/AdminChannels";
import AdminMod from "../elements/admin/AdminMod";
import AdminAddMod from "../elements/admin/AdminAddMod";
const { publicRuntimeConfig } = getConfig();
import Head from 'next/head'
export default function AdminScreen() {
  const { user } = useContext(userContext);
  const [sel, setSel] = useState({
    users: false,
    muxp: false,
    mut: false,
    rup: false,
    channels: false,
    uc: false,
  });
  const [admin, setAdmin] = useState({ loading: true, admin: false });
  useEffect(async () => {
    try {
      const val = await axios.post( publicRuntimeConfig.BACKEND_URL + "/user/info", {
        data: {
          username: user.user,
        },
      });
      console.log(val.data)
      if (!val || val.data.id <= 0) {
        Router.push("/member");
        return setAdmin({ loading: false, admin: false });
      }
      if (val.data.u.admin_op) return setAdmin({ loading: false, admin: true });
      Router.push("/member");
    } catch (error) {
      console.log(error.message);
      Router.push("/member");
      return setAdmin({ loading: false, admin: false });
    }
  }, [user.user]);
  return <>
  <Head>
    <title>
      Admin Page
    </title>
  </Head>
  !admin.loading && admin.admin ? (
    <div style={{ paddingTop: "2rem" }}>
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title text-center m-5">
                  <span class="glyphicon glyphicon-bookmark"></span> Admin Panel View
                </h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-md-12 text-center text-white">
                    <a
                      class="btn btn-primary btn-lg "
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ users: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-list-alt"></span>
                      Users
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ muxp: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-bookmark"></span>
                      Modify Users XP
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ mut: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-signal"></span>
                      Modify Users Title
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ rup: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-signal"></span>
                      Reset User Password
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ channels: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-comment"></span>
                      Channels
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ mod: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-comment"></span>
                      Site Moderators
                    </a>
                    <a
                      class="btn btn-primary btn-lg"
                      style={{ margin: "1rem" }}
                      role="button"
                      onClick={() => {
                        setSel({ addmod: true });
                      }}
                    >
                      <span class="glyphicon glyphicon-comment"></span>
                      Add Site Moderator
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="text-center"
                    style={{ width: "20rem", margin: "auto", marginTop:"3.5rem"}}
                  >
                    {sel.users ? (<div><AdminUsers></AdminUsers></div>) : null}
                    {sel.muxp ? <div><AdminMUX></AdminMUX></div> : null}
                    {sel.mut ? <div><AdminMUT></AdminMUT></div> : null}
                    {sel.rup ? <div><AdminRUP></AdminRUP></div> : null}
                    {sel.channels ? <div><AdminChannels></AdminChannels></div> : null}
                    {sel.mod ? (<div><AdminMod></AdminMod></div>) : null}
                    {sel.addmod ? (<div><AdminAddMod></AdminAddMod></div>) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  </>
}
