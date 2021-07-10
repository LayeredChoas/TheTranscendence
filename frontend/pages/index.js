import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { auth } from "./../src/functions/auth";
import { createMemoryHistory } from "history";
import Navbar from "../src/elements/navbar";
import Body from "../src/elements/Body";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import LogoutScreen from "../src/screens/LogoutScreen";
import RedirectScreen from "../src/screens/RedirectScreen";
import MembersScreen from "../src/screens/MembersScreen";
import NewUserScreen from "../src/screens/NewUserScreen";
import SettignsScreen from "../src/screens/SettingsScreen";
import UserProfileScreen from "../src/screens/UserProfileScreen";
import ChannelsScreen from "../src/screens/ChannelsScreen";
import FriendsScreen from "../src/screens/FriendsScreen";
import FriendsRequestScreen from "../src/screens/FriendsRequestScreen";
import MessagesScreen from "../src/screens/MessagesScreen";
import MatchScreen from "../src/screens/MatchScreen";
import GameScreen from "../src/screens/GameScreen";
import ChannelScreen from "../src/screens/ChannelScreen";
import { Link, Switch } from "react-router-dom";
import AdminScreen from "../src/screens/AdminScreen";

import userContext from "./../src/context/AuthProvider";

const history = createMemoryHistory();

export default function Home() {

  return (
    <div className={styles.container}>
      <Router history={history}>
        {/* <Navbar /> */}
        <div className="App.MainBody">
          <Switch>
            <Route path="/" exact component={Body}></Route>
            <Route path="/login"></Route>

            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/logout" component={LogoutScreen}></Route>
            <Route path="/redirect" component={RedirectScreen}></Route>

            {/* Private Directories */}

            <Route path="/member" component={MembersScreen}></Route>
            <Route path="/new-user" component={NewUserScreen}></Route>
            <Route path="/settings" component={SettignsScreen}></Route>
            <Route path="/user" component={UserProfileScreen}></Route>
            <Route path="/channels" component={ChannelsScreen}></Route>
            <Route path="/friends" component={FriendsScreen}></Route>
            <Route
              path="/friends_request"
              component={FriendsRequestScreen}
            ></Route>
            <Route path="/messages" component={MessagesScreen}></Route>
            <Route path="/match" component={MatchScreen}></Route>
            <Route path="/game" component={GameScreen}></Route>
            <Route path="/channel" component={ChannelScreen}></Route>
            <Route path="/admin" component={AdminScreen}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
