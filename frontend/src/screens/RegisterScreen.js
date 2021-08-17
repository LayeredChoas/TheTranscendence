// import "../css_files/Login.css";
import axios from "axios";
import { useHistory } from "react-router";
import Router from "next/router";
import { useEffect } from "react";
import getConfig from "next/config";
import Head from "next/head";


export default function RegisterScreen() {
  const history = useHistory();

  useEffect(async () => {
    try {
      const { publicRuntimeConfig } = getConfig();
      const val = await axios.get(publicRuntimeConfig.BACKEND_URL + "/auth_link");
      const authlink = val.data;
      console.log(authlink);
      setTimeout(function () {
        window.location.assign(authlink);
        console.log(authlink);
      }, 2000);
    } catch (error) {
      console.log(error.message);
      // Router.push('/error');
    }
  }, []);
  return (
    <div className="container">
      <Head>
        <title>
          Register
        </title>
      </Head>
      <div className="row Register">
        <div className="col align-self-start">{/* One of three columns */}</div>
        <div className="col">
          <h1 className="text-black">
            Loading...{" "}
            <div className="spinner-border align-self-center text-red"></div>
          </h1>
        </div>
        <div className="col align-self-end">{/* One of three columns */}</div>
      </div>
    </div>
  );
}
