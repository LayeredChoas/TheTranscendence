import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import UserLadder from "./../elements/UserLadder";
function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? 1 : x > y ? -1 : 0;
  });
}

export default function LadderScreen() {
  const [users, setUsers] = useState(false);
  useEffect(async () => {
    let v = [];
    try {
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL + "/search");
      if (!val || val.data.id <= 0) return;
      v = val.data;
      v = sort_by_key(v, "xp");
      setUsers(v);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  let v = 0;
  return (
    <div className="text-center" style={{width:"100%", margin:"auto"}}>
      {users ? (
          <div class="container mt-3 mb-4">
            <div class="mt-4 mt-lg-0">
              <div class="row">
                <div class="col-md-12">
                  <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm" style={{overflowX: "hidden"}}>
                    <table class="table manage-candidates-top mb-0">
                      <thead>
                        <tr>
                            <th class="text-center"> Ranking</th>
                          <th class="text-center"> Player Name</th>
                          <th class="text-center">XP</th>
                          <th class="action text-right">Level</th>
                        </tr>
                      </thead>
                      {users.map((u) => {
                        v++;
                        return <UserLadder user={u} v={v}></UserLadder>;
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ) : null}
    </div>
  );
}
