import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../src/context/AuthProvider";
import Router from "next/router";
import GameScreen from "../../src/screens/GameScreen";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function Com() {
  const router = useRouter();
  const { user, setUser } = useContext(userContext);
  const slug = router.query.slug;
  const [load, setLoad] = useState(false);
  const [info, setInfo] = useState(false);
  let gameId;
  if (slug) gameId = slug[0];
  if (slug?.length > 1 && user.user) Router.push(`/member`);
  useEffect(() => {
    const f = async () => {
      try {
        if (gameId) {
          const val = await axios.get(
            publicRuntimeConfig.BACKEND_URL + `/game/${gameId}`
          );
          if (!val || val.data.id <= 0) return Router.push(`/member`);
          setLoad(true);
          setInfo(val.data);
          console.log(val.data);
        }
      } catch (error) {
        console.log(error.message);
        return Router.push(`/member`);
      }
    };
    f();
  }, [gameId]);
  if (gameId) {
    return (
      <div>{load && info ? <GameScreen data={info}></GameScreen> : null}</div>
    );
  }
  return <div></div>;
}
