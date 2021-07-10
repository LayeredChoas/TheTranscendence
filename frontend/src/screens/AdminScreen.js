import { useContext, useState } from "react";
import { userContext } from "../context/AuthProvider";
import AdminUsers from "../elements/admin/AdminUsers";
import UserNotLogged from "../elements/UserNotLogged";
import FactorScreen from "./FactorScreen";
// import styles from "../css_files/AdminScreen.css"

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

  return !user.isLoading ? (
    user.isLoggedIn ? (
      <div style={{ paddingTop: "2rem" }}>
        <div class="container bootstrap snippets bootdey">
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">
                    <span class="glyphicon glyphicon-bookmark"></span> Quick
                    Shortcuts
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
                          setSel({ uc: true });
                        }}
                      >
                        <span class="glyphicon glyphicon-comment"></span>
                        Update Channel
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="text-center"
                      style={{ width: "20rem", margin: "auto" }}
                    >
                      {sel.users ? (
                        <div>
                          <AdminUsers></AdminUsers>
                        </div>
                      ) : null}
                      {sel.muxp ? <div>muxp</div> : null}
                      {sel.mut ? <div>mut</div> : null}
                      {sel.rup ? <div>rup</div> : null}
                      {sel.channels ? <div>channels</div> : null}
                      {sel.uc ? <div>uc</div> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : !user.isLoggedIn && user.auth ? (
      <FactorScreen></FactorScreen>
    ) : !user.isLoggedIn ? (
      <UserNotLogged />
    ) : null
  ) : null;
}
